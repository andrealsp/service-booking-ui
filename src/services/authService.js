import { apiClient, ApiError } from "./api";

export async function login(identifier, password) {
  const data = await apiClient.post("/auth/login", { identifier, password });

  if (!data?.token) {
    throw new ApiError("Invalid credentials", { status: 401 });
  }

  const cleanToken = data.token.replace(/^Bearer\s+/i, "");
  localStorage.setItem("token", cleanToken);
  return data;
}

/**
 * Public registration — backend always forces role=CLIENT, regardless of what
 * we send. We still pass "Client" for clarity but it's purely cosmetic.
 */
export async function registerUser(formData) {
  const payload = {
    fullName: formData.fullName,
    givenName: formData.givenName,
    identificationDocument: formData.identificationDocument,
    contact: {
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
    },
    username: formData.username,
    password: formData.password,
    role: "Client",
  };

  return apiClient.post("/auth/register", payload);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
}

export async function validateToken() {
  const token = getToken();
  if (!token) return false;
  try {
    const result = await apiClient.get("/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Boolean(result);
  } catch {
    return false;
  }
}
