import { FaCheck, FaTimes } from "react-icons/fa";

import {
  PASSWORD_POLICY,
  buildSpecialsCharClass,
} from "@/services/passwordService";

import styles from "./PasswordHints.module.css";

function Rule({ ok, children }) {
  return (
    <li className={`${styles.rule} ${ok ? styles.ok : ""}`}>
      {ok ? <FaCheck aria-hidden /> : <FaTimes aria-hidden />}
      <span>{children}</span>
    </li>
  );
}

export default function PasswordHints({ value = "" }) {
  // Reuse the central helper so the escape rules (especially `-` not being
  // interpreted as a range inside [...]) stay correct in one place.
  const specialsClass = buildSpecialsCharClass();
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = new RegExp(`[${specialsClass}]`).test(value);
  const longEnough = value.length >= PASSWORD_POLICY.minLength;

  return (
    <ul className={styles.list} aria-label="Password requirements">
      <Rule ok={longEnough}>
        At least {PASSWORD_POLICY.minLength} characters
      </Rule>
      <Rule ok={hasUpper}>One uppercase letter (A–Z)</Rule>
      <Rule ok={hasLower}>One lowercase letter (a–z)</Rule>
      <Rule ok={hasDigit}>One digit (0–9)</Rule>
      <Rule ok={hasSpecial}>
        One special from{" "}
        <code className={styles.specials}>
          {PASSWORD_POLICY.allowedSpecials}
        </code>
      </Rule>
    </ul>
  );
}
