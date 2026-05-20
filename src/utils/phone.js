/**
 * Phone helpers.
 *
 *   - {@code splitPhone}: parses an E.164-ish string like "+55 11 99999-1234"
 *     into { dialCode, national } so we can rehydrate the UI when editing.
 *   - {@code joinPhone}: builds the canonical "+{dial} {national}" string.
 *   - {@code detectLineType}: returns "mobile" | "landline" | "unknown".
 *     For Brazil (the most common case) we apply the official rule from
 *     ANATEL — see comments below. Other countries fall back to a generic
 *     heuristic on the leading digit.
 */

import { findByDialCode } from "./countries";

const SEPARATOR_RX = /[\s()\-.]/g;

export function digits(raw) {
  if (raw == null) return "";
  return String(raw).replace(/\D/g, "");
}

/**
 * Try every dial code we know (longest first) and pull it off the front
 * of the number. Whatever is left is the national subscriber number.
 *
 * Accepts inputs with or without the leading "+".
 */
export function splitPhone(raw, fallbackCountry) {
  const fallback = fallbackCountry || findByDialCode("55");
  if (!raw) return { dialCode: fallback?.dialCode || "55", national: "" };

  const all = digits(raw);
  if (!all) return { dialCode: fallback?.dialCode || "55", national: "" };

  // Try the longest prefixes first to avoid e.g. "1" stealing from "1809".
  for (let prefixLen = 4; prefixLen >= 1; prefixLen--) {
    if (all.length <= prefixLen) continue;
    const candidate = all.slice(0, prefixLen);
    if (findByDialCode(candidate)) {
      return { dialCode: candidate, national: all.slice(prefixLen) };
    }
  }
  return { dialCode: fallback?.dialCode || "55", national: all };
}

export function joinPhone(dialCode, national) {
  const nat = digits(national);
  if (!nat) return "";
  return `+${dialCode} ${formatNational(dialCode, nat)}`;
}

/**
 * Light formatter so the canonical string is human readable.
 * For Brazil we apply DDD (XX) NNNN(N)-NNNN. Other countries get a single
 * space every 4 digits as a generic compromise.
 */
export function formatNational(dialCode, raw) {
  const d = digits(raw);
  if (dialCode === "55") {
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return d;
  }
  if (dialCode === "1") {
    if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    return d;
  }
  // Generic: chunks of 4
  return d.replace(/(.{4})(?=.)/g, "$1 ");
}

/**
 * Brazilian rule (ANATEL):
 *   - Mobile: 11 digits (DDD + 9 + 8 digits)
 *   - Landline: 10 digits (DDD + 2..5 + 7 digits)
 *
 * Other countries:
 *   - Brazil-style heuristic (looking at the FIRST national-significant
 *     digit) isn't portable, so we mark "unknown" unless we have a
 *     hand-coded rule. Keeps the badge honest.
 */
export function detectLineType(dialCode, national) {
  const d = digits(national);
  if (!d) return "unknown";

  if (dialCode === "55") {
    if (d.length === 11 && d[2] === "9") return "mobile";
    if (d.length === 10 && /^[2-5]/.test(d.slice(2, 3))) return "landline";
    return "unknown";
  }

  // US/Canada/etc on +1 — historically can't be told apart by prefix alone.
  // Returning "unknown" prevents false labels.
  return "unknown";
}

/**
 * Strip mask characters and return E.164 (e.g. "+5511999991234").
 * Useful when sending to the backend so the wire format is normalized.
 */
export function toE164(dialCode, national) {
  const d = digits(national);
  if (!d) return "";
  return `+${dialCode}${d}`;
}
