import { apiClient } from "./api";

/**
 * Centralised set of password-related rules — kept in sync with the
 * server-side {@code PasswordPolicy}. Keeping a copy on the client lets us
 * give instant feedback to the user without a round-trip.
 */
export const PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 64,
  allowedSpecials: "!@#$%^&*()-_=+[]{}<>?/,.:|~",
};

/**
 * Build a regex character-class body that LITERALLY matches every char in
 * {@link PASSWORD_POLICY.allowedSpecials}.
 *
 * Why this exists: the previous escape function omitted {@code -}, so when
 * the string ended up between two other chars inside {@code [...]} the `-`
 * was interpreted as a *range operator*. Specifically `()-_` became the
 * range 0x29→0x5F, which silently included A-Z, digits, and several
 * symbols. Users would see "✓ One special" turn green just by typing a
 * letter, then get rejected on the server (which uses Java's
 * {@code Pattern.quote(...)} and isn't affected).
 *
 * The fix: escape ALL regex meta-characters that have special meaning
 * inside a character class — including `-` (range), `^` (negation when
 * leading), and `]` (terminator). When in doubt, escape it.
 *
 * The {@code u} flag isn't strictly needed but signals intent: we treat
 * the source as a flat sequence of code units.
 */
export function buildSpecialsCharClass() {
  // `-` is placed at the end of the class so it's matched literally — no
  // need to escape it here. The escape function then wraps every meta-char
  // (including `-`) with `\` so they can't be misread when the result is
  // re-embedded into another character class.
  return PASSWORD_POLICY.allowedSpecials.replace(
    /[.*+?^${}()|[\]\\-]/g,
    "\\$&"
  );
}

export function validatePasswordClientSide(raw) {
  if (!raw) return "Password is required.";
  if (raw.length < PASSWORD_POLICY.minLength)
    return `Password must have at least ${PASSWORD_POLICY.minLength} characters.`;
  if (raw.length > PASSWORD_POLICY.maxLength)
    return `Password must have at most ${PASSWORD_POLICY.maxLength} characters.`;

  const specialsClass = buildSpecialsCharClass();
  const allowedRegex = new RegExp(`^[A-Za-z0-9${specialsClass}]+$`);
  if (!allowedRegex.test(raw))
    return `Password contains disallowed characters. Allowed specials: ${PASSWORD_POLICY.allowedSpecials}`;

  if (!/[A-Z]/.test(raw)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(raw)) return "Password must include a lowercase letter.";
  if (!/\d/.test(raw)) return "Password must include a digit.";

  const specialRegex = new RegExp(`[${specialsClass}]`);
  if (!specialRegex.test(raw))
    return `Password must include one of: ${PASSWORD_POLICY.allowedSpecials}`;
  return null;
}

export function passwordStrengthScore(raw) {
  if (!raw) return 0;
  let s = 0;
  if (raw.length >= PASSWORD_POLICY.minLength) s++;
  if (/[A-Z]/.test(raw)) s++;
  if (/[a-z]/.test(raw)) s++;
  if (/\d/.test(raw)) s++;
  if (new RegExp(`[${buildSpecialsCharClass()}]`).test(raw)) s++;
  if (raw.length >= 12) s++;
  return s;
}

export function requestResetCode(identifier, channel) {
  return apiClient.post("/auth/forgot-password", { identifier, channel });
}

export function resetPassword({ identifier, code, newPassword }) {
  return apiClient.post("/auth/reset-password", {
    identifier,
    code,
    newPassword,
  });
}

export function changePassword({ currentPassword, newPassword }) {
  return apiClient.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });
}

/**
 * "I forgot my username" — backend looks the registered email up and either
 * returns the matched username or signals that the email is not on file.
 * Response shape: { found: boolean, username?: string, message: string }
 */
export function recoverUsername(email) {
  return apiClient.post("/auth/recover-username", { email });
}
