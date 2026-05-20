import { apiClient } from "./api";

export function suggestSlots({ providerId, clientId, around, limit = 5 }) {
  const params = new URLSearchParams({
    providerId,
    clientId,
    limit: String(limit),
  });
  if (around) params.set("around", around);
  return apiClient.get(`/scheduling/suggest?${params.toString()}`);
}

/**
 * Provider's busy intervals (PENDING_APPROVAL + CONFIRMED appointments) in
 * the given [from, to) window. Used by the AppointmentForm to disable
 * conflicting times and to warn the user before they submit a colliding
 * slot. The backend caps the window at 90 days.
 *
 * `from` and `to` must be ISO-8601 strings WITH offset (e.g. "2026-05-18T00:00:00-03:00")
 * — the backend uses {@code @DateTimeFormat(iso=DATE_TIME)} for parsing.
 */
export function getProviderBusySlots(providerId, from, to) {
  const params = new URLSearchParams({ from, to });
  return apiClient.get(`/providers/${providerId}/busy?${params.toString()}`);
}
