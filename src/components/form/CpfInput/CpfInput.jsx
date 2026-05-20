import { useState } from "react";

import { digits, isValidCpf, maskCpf } from "@/utils/cpf";

import styles from "./CpfInput.module.css";

/**
 * Friendly CPF input.
 *
 *   - Accepts only digits but renders the XXX.XXX.XXX-XX mask in real time.
 *   - Emits the digits-only value to the parent via {@code onChange(value)}.
 *   - Shows a subtle validation hint while the user types and a strong red
 *     message once they leave the field with an invalid number.
 */
function CpfInput({
  label = "CPF",
  name = "identificationDocument",
  value = "",
  onChange,
  error,
  required = true,
  disabled = false,
  ...rest
}) {
  const [touched, setTouched] = useState(false);
  const masked = maskCpf(value);
  const completed = digits(value).length === 11;
  const valid = completed && isValidCpf(value);
  const showInlineError = (touched && completed && !valid) || Boolean(error);

  function handleChange(e) {
    const onlyDigits = digits(e.target.value).slice(0, 11);
    onChange?.({ target: { name, value: onlyDigits } });
  }

  return (
    <div className={styles.group}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrap}>
        <input
          id={name}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={masked}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder="000.000.000-00"
          maxLength={14}
          required={required}
          disabled={disabled}
          className={`${styles.input} ${showInlineError ? styles.errorInput : ""}`}
          {...rest}
        />
        {completed && (
          <span
            className={`${styles.statusBadge} ${valid ? styles.ok : styles.bad}`}
            aria-hidden
          >
            {valid ? "✓" : "✗"}
          </span>
        )}
      </div>

      {showInlineError && (
        <span className={styles.errorText}>
          {error || "Invalid CPF — please double-check the digits."}
        </span>
      )}
    </div>
  );
}

export default CpfInput;
