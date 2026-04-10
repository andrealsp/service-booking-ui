import { apiFetch } from "./api";

export async function login(identifier, password) {
  const data = await apiFetch("/nexus/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });

  if (!data.token) {
    throw new Error(data.message || "Invalid credentials");
  }

  const cleanToken = data.token.replace(/^Bearer\s+/i, "");
  localStorage.setItem("token", cleanToken);

  return data;
}

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

  const data = await apiFetch("/nexus/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (data.error || data.message) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
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
    // Assuming the API has a validate endpoint
    const data = await apiFetch("/nexus/v1/auth/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.valid || true; // Adjust based on API response
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
}
