import { apiClient } from "./api";

/**
 * Returns the list of users registered with the PROVIDER role.
 * Backend response shape:
 *   [{ id, fullName, givenName, email, role }]
 */
export function listProviders() {
  return apiClient.get("/providers");
}
