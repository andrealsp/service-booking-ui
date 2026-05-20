import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.userId,
      username: decoded.username,
      givenName: decoded.given_name,
      fullName: decoded.full_name,
      email: decoded.email,
      role: decoded.role,
      passwordChangeRequired: Boolean(decoded.password_change_required),
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export function isTokenExpired() {
  const user = getUserFromToken();
  if (!user?.exp) return true;
  return Date.now() >= user.exp * 1000;
}
