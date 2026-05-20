const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = "/nexus/v1";

// Endpoints where a 401 is part of the flow itself (login attempt, code
// verification, etc.) — we DON'T auto-logout the user when these fail.
const NO_AUTO_LOGOUT_PATHS = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/recover-username",
  "/auth/validate",
];

export class ApiError extends Error {
  constructor(message, { status, code, traceId, payload } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.traceId = traceId;
    this.payload = payload;
  }
}

function buildUrl(endpoint) {
  if (/^https?:\/\//.test(endpoint)) return endpoint;
  if (endpoint.startsWith(API_PREFIX)) return `${API_URL}${endpoint}`;
  return `${API_URL}${API_PREFIX}${endpoint}`;
}

async function readBody(response) {
  const contentType = response.headers.get("content-type") || "";
  if (response.status === 204) return null;
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  try {
    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
}

function shouldAutoLogout(endpoint) {
  return !NO_AUTO_LOGOUT_PATHS.some((p) => endpoint.includes(p));
}

/**
 * When the server signals an expired/invalid token, drop the local copy and
 * bounce the user back to /login. Avoids loops by skipping the redirect on
 * auth-related endpoints (they expect 401s as part of the flow).
 */
function handleUnauthorized(endpoint) {
  if (!shouldAutoLogout(endpoint)) return;
  try {
    localStorage.removeItem("token");
  } catch {
    /* ignore quota / private mode errors */
  }
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    // `replace` so the user can't hit Back into a broken session.
    window.location.replace("/login?reason=session_expired");
  }
}

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(buildUrl(endpoint), { ...options, headers });
  } catch (networkError) {
    throw new ApiError(
      "Could not reach the server. Check your connection and try again.",
      { status: 0, code: "NETWORK_ERROR" }
    );
  }

  const body = await readBody(response);

  if (!response.ok) {
    if (response.status === 401) handleUnauthorized(endpoint);

    const message = pickMessage(body, response.status);
    throw new ApiError(message, {
      status: response.status,
      code: body?.errorCode,
      traceId: body?.traceId,
      payload: body,
    });
  }

  return body;
}

/**
 * Best-effort message extraction so the UI never shows the raw
 * "Request failed with status 500" when the backend actually returned
 * something descriptive. The backend uses {@code ErrorTemplate} which
 * always carries `message`.
 */
function pickMessage(body, status) {
  if (body && typeof body === "object") {
    if (typeof body.message === "string" && body.message.trim()) return body.message;
    if (typeof body.error === "string" && body.error.trim()) return body.error;
  }
  if (typeof body === "string" && body.trim()) return body;
  // Final fallback — try to be friendlier than "Request failed with status N".
  return statusFriendly(status);
}

function statusFriendly(status) {
  switch (status) {
    case 400: return "The request was rejected. Check the highlighted fields.";
    case 401: return "Your session expired. Please sign in again.";
    case 403: return "You don't have permission to do that.";
    case 404: return "We couldn't find what you were looking for.";
    case 409: return "Conflict — that value is already in use.";
    case 422: return "Invalid input.";
    case 429: return "Too many attempts. Please slow down and try again.";
    case 500: return "Something went wrong on our side. Please try again.";
    case 503: return "A dependency is temporarily unavailable. Try again shortly.";
    default:  return `Request failed with status ${status}`;
  }
}

export const apiClient = {
  get: (endpoint, options) => apiFetch(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    apiFetch(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: (endpoint, body, options) =>
    apiFetch(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: (endpoint, body, options) =>
    apiFetch(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: (endpoint, options) =>
    apiFetch(endpoint, { ...options, method: "DELETE" }),
};
