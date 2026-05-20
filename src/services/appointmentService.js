import { apiClient } from "./api";

export const APPOINTMENT_STATUS = {
  PENDING_APPROVAL: "PENDING_APPROVAL",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  NO_SHOW: "NO_SHOW",
};

export function createAppointment(payload) {
  return apiClient.post("/appointments", payload);
}

export function getAppointment(id) {
  return apiClient.get(`/appointments/${id}`);
}

export function listClientAppointments(clientId) {
  return apiClient.get(`/clients/${clientId}/appointments`);
}

export function listProviderAppointments(providerId) {
  return apiClient.get(`/providers/${providerId}/appointments`);
}

/**
 * Full clinic agenda — every appointment overlapping the [from, to) window
 * regardless of provider/client. Backend rejects non-ADMIN / non-ASSISTANT
 * callers with a 403.
 *
 * `from` / `to` are ISO-8601 strings with offset.
 */
export function listAllAppointmentsInWindow(from, to) {
  const qs = new URLSearchParams({ from, to }).toString();
  return apiClient.get(`/appointments?${qs}`);
}

/**
 * Public deep-link target: the client clicks the SMS / WhatsApp / Email
 * reminder and lands on /confirm/:token, which calls this endpoint. No JWT
 * required — the token IS the authorization.
 */
export function confirmAppointmentByToken(token) {
  return apiClient.post(`/confirmations/${token}`);
}

/** Approve a Client request (PENDING_APPROVAL → CONFIRMED). */
export function confirmAppointment(id) {
  return apiClient.patch(`/appointments/${id}/confirm`);
}

/** Cancel an appointment. Reason is mandatory when caller role is PROVIDER. */
export function cancelAppointment(id, reason) {
  return apiClient.patch(`/appointments/${id}/cancel`, reason ? { reason } : null);
}

/**
 * Mark a CONFIRMED appointment as COMPLETED. The provider can attach optional
 * `observations` (notes about the visit) that will appear in the client's
 * visit history. Pass `null`/empty to complete without notes.
 */
export function completeAppointment(id, observations) {
  const body =
    observations && observations.trim() ? { observations: observations.trim() } : null;
  return apiClient.patch(`/appointments/${id}/complete`, body);
}

/**
 * Visit history for a client — past appointments with terminal status
 * (COMPLETED / CANCELLED / NO_SHOW), most-recent-first. The backend filters
 * by caller role (provider sees only their own visits with this client).
 */
export function listClientHistory(clientId) {
  return apiClient.get(`/clients/${clientId}/history`);
}

export function deleteAppointment(id) {
  return apiClient.delete(`/appointments/${id}`);
}
