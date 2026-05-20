import { useEffect, useState } from "react";
import { FaTimes, FaClipboardCheck } from "react-icons/fa";

import styles from "./CancelAppointmentModal.module.css";

/**
 * Wraps the PATCH /appointments/{id}/complete call.
 *
 * Observations are OPTIONAL — every completed visit goes into the client's
 * history regardless. We make that explicit in the copy so the provider
 * doesn't feel forced to write notes for routine visits.
 */
function CompleteAppointmentModal({ appointment, onSubmit, onClose, error }) {
  const [observations, setObservations] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(observations.trim() || null);
    } finally {
      setSubmitting(false);
    }
  }

  const clientLabel =
    appointment?.clientName || appointment?.clientId || "the client";

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
          <h3>Complete appointment</h3>
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
            <FaClipboardCheck aria-hidden />
            <p>
              Marking this appointment as <strong>completed</strong> for{" "}
              <strong>{clientLabel}</strong>. Observations are optional —
              every completed visit appears in the client's history with or
              without notes.
            </p>
          </div>

          <label className={styles.field}>
            <span>Observations (optional)</span>
            <textarea
              rows={5}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Anything worth carrying to the next visit — preferences, outcomes, follow-ups…"
              maxLength={2000}
            />
            <span className={styles.charCount}>
              {observations.length}/2000
            </span>
          </label>

          {error && <div className={styles.errorBox}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.danger}
              style={{ background: "#6d28d9", borderColor: "#6d28d9" }}
              disabled={submitting}
            >
              {submitting ? "Saving…" : "Mark as completed"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteAppointmentModal;
