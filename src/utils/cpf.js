/**
 * Brazilian CPF utilities.
 *
 * We always store digits only ("12345678900") and display with the mask
 * (XXX.XXX.XXX-XX). The validation algorithm mirrors the server-side
 * {@code CpfValidator}.
 */

export function digits(raw) {
  if (raw == null) return "";
  return String(raw).replace(/\D/g, "");
}

/** Mask a digits-only or partially typed string into XXX.XXX.XXX-XX. */
export function maskCpf(raw) {
  const d = digits(raw).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
}

export function isValidCpf(raw) {
  const d = digits(raw);
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false; // 00000000000, 11111111111, ...

  // First check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(d[i], 10) * (10 - i);
  let first = (sum * 10) % 11;
  if (first === 10) first = 0;
  if (first !== parseInt(d[9], 10)) return false;

  // Second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(d[i], 10) * (11 - i);
  let second = (sum * 10) % 11;
  if (second === 10) second = 0;
  return second === parseInt(d[10], 10);
}
