import { apiClient } from "./api";

/**
 * Admin / Assistant user management.
 * Backend mounts these under /admin/users and enforces ROLE_ADMIN or
 * ROLE_ASSISTANT via @PreAuthorize. Calling from a non-privileged role
 * yields 403.
 */
export function listUsers() {
  return apiClient.get("/admin/users");
}

/**
 * Single-user fetch — used to pre-fill the edit form with the full profile
 * (the list endpoint returns the same shape but we still hit this so a
 * stale list doesn't show outdated data in the modal).
 */
export function getUser(id) {
  return apiClient.get(`/admin/users/${id}`);
}

export function createUser(payload) {
  // Backend expects the same shape as IdentitySignupRequest.
  return apiClient.post("/admin/users", payload);
}

export function updateUser(id, patch) {
  return apiClient.patch(`/admin/users/${id}`, patch);
}

/**
 * Admin-driven password reset.
 * The server applies the same password policy and history check used for
 * self-service changes, then flips the `password_change_required` flag so
 * the target user must rotate the temporary password at next login.
 */
export function resetUserPassword(id, temporaryPassword) {
  return apiClient.post(`/admin/users/${id}/reset-password`, {
    temporaryPassword,
  });
}

export function deleteUser(id) {
  return apiClient.delete(`/admin/users/${id}`);
}
