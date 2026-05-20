import { useEffect, useState } from "react";
import { FaTimes, FaKey, FaExclamationTriangle } from "react-icons/fa";

import Input from "../../form/Input/Input";
import PasswordHints from "../Password/PasswordHints";
import { validatePasswordClientSide } from "@/services/passwordService";

import styles from "./ResetPasswordPrompt.module.css";

/**
 * 2-step admin reset:
 *
 *   step "confirm"  → "Are you sure you want to reset {user}'s password?"
 *                     Confirms by clicking "Continue".
 *
 *   step "password" → admin types the temporary password. Submitting sends
 *                     it to the server, which validates the policy, swaps
 *                     the hash and forces the user to rotate at next login.
 *
 * The two steps live in the same modal so the admin keeps context: closing
 * at any point cancels the whole flow.
 */
function ResetPasswordPrompt({ user, onConfirm, onClose, error }) {
  const [step, setStep] = useState("confirm");
  const [tempPassword, setTempPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);
    const policyError = validatePasswordClientSide(tempPassword);
    if (policyError) {
      setLocalError(policyError);
      return;
    }
    setSubmitting(true);
    try {
      await onConfirm(tempPassword);
    } finally {
      setSubmitting(false);
    }
  }

  const displayName = user?.givenName || user?.fullName || "this user";

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modal}>
        <header className={styles.head}>
          <h3>
            <FaKey aria-hidden /> Reset password
          </h3>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </header>

        {step === "confirm" && (
          <div className={styles.body}>
            <div className={styles.notice}>
              <FaExclamationTriangle aria-hidden />
              <p>
                Reset the password for <strong>{displayName}</strong>?<br />
                After confirming, you'll define a temporary password. The user
                will be forced to change it at the next login.
              </p>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.primary}
                onClick={() => setStep("password")}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === "password" && (
          <form onSubmit={handleSubmit} className={styles.body} noValidate>
            <p className={styles.subtitle}>
              Choose a temporary password for{" "}
              <strong>{displayName}</strong>. Share it through a private
              channel — the user will be required to change it at next login.
            </p>

            <Input
              label="Temporary password"
              type="password"
              name="temporaryPassword"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              autoComplete="new-password"
              autoFocus
            />

            <PasswordHints value={tempPassword} />

            {(localError || error) && (
              <div className={styles.error}>{localError || error}</div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setStep("confirm")}
                disabled={submitting}
              >
                Back
              </button>
              <button
                type="submit"
                className={styles.primary}
                disabled={submitting}
              >
                {submitting ? "Resetting…" : "OK · Reset password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPrompt;
