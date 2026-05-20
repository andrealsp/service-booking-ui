import { useEffect, useState } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

import styles from "./CancelAppointmentModal.module.css";

/**
 * Reason input is mandatory when the caller's role is PROVIDER (per the
 * product spec). Other roles see the field optional but encouraged.
 */
function CancelAppointmentModal({
  appointment,
  reasonRequired = false,
  onSubmit,
  onClose,
  error,
}) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const reasonMissing = reasonRequired && !reason.trim();

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (reasonMissing) return;
    setSubmitting(true);
    try {
      await onSubmit(reason.trim() || null);
    } finally {
      setSubmitting(false);
    }
  }

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
          <h3>Cancel appointment</h3>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.notice}>
            <FaExclamationTriangle aria-hidden />
            <p>
              You are about to cancel an appointment.{" "}
              {reasonRequired ? (
                <strong>The reason is required.</strong>
              ) : (
                "A short reason helps everyone involved understand what happened."
              )}
            </p>
          </div>

          <label className={styles.field}>
            <span>
              Reason {reasonRequired && <em className={styles.req}>· required</em>}
            </span>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                reasonRequired
                  ? "Why are you cancelling? (visible to the client)"
                  : "Optional context for the audit log"
              }
              maxLength={500}
              required={reasonRequired}
              onBlur={() => setTouched(true)}
            />
            {touched && reasonMissing && (
              <span className={styles.errorMsg}>
                Provider cancellations require a reason.
              </span>
            )}
          </label>

          {error && <div className={styles.errorBox}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={onClose}
              disabled={submitting}
            >
              Keep appointment
            </button>
            <button
              type="submit"
              className={styles.danger}
              disabled={submitting || reasonMissing}
            >
              {submitting ? "Cancelling…" : "Confirm cancellation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelAppointmentModal;
