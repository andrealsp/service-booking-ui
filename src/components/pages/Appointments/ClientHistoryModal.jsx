import { useEffect, useState } from "react";
import { FaTimes, FaHistory, FaCommentDots } from "react-icons/fa";

import Spinner from "../../feedback/Spinner/Spinner";
import EmptyState from "../../feedback/EmptyState/EmptyState";
import StatusBadge from "../../feedback/StatusBadge/StatusBadge";
import { listClientHistory } from "@/services/appointmentService";
import { formatDate, formatTime } from "@/utils/datetime";

import styles from "./CancelAppointmentModal.module.css";

/**
 * Modal showing the client's visit history scoped to the caller's view
 * (the backend enforces visibility — providers see only past visits between
 * them and this client, admin/assistant see all).
 *
 * Surfaces the trifecta the spec called for:
 *   - Appointments made
 *   - Appointments cancelled
 *   - Observations captured at completion (when present)
 */
function ClientHistoryModal({ clientId, clientName, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    listClientHistory(clientId)
      .then((data) => {
        if (!active) return;
        setHistory(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load client history");
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [clientId]);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modal} style={{ maxWidth: 640 }}>
        <header className={styles.head}>
          <h3>
            <FaHistory style={{ marginRight: 8, verticalAlign: "-2px" }} />
            Client history{clientName ? ` — ${clientName}` : ""}
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

        <div className={styles.form} style={{ gap: 12 }}>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
              <Spinner size="md" />
            </div>
          )}

          {!loading && error && (
            <div className={styles.errorBox}>{error}</div>
          )}

          {!loading && !error && history.length === 0 && (
            <EmptyState
              icon="📭"
              title="No past visits yet"
              description="When appointments are completed or cancelled, they show up here."
            />
          )}

          {!loading && !error && history.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {history.map((h) => (
                <li
                  key={h.id}
                  style={{
                    border: "1px solid #eef2f7",
                    borderRadius: 12,
                    padding: "12px 14px",
                    background: "#fafbfc",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <strong style={{ fontSize: 14 }}>
                      {formatDate(h.startAt)} · {formatTime(h.startAt)}
                    </strong>
                    <StatusBadge status={h.status} />
                  </div>

                  {h.providerName && (
                    <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
                      Provider: <strong>{h.providerName}</strong>
                    </div>
                  )}

                  {h.status === "CANCELLED" && h.cancellationReason && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "#991b1b",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        padding: "6px 10px",
                        borderRadius: 8,
                      }}
                    >
                      <strong>Cancellation reason: </strong>
                      {h.cancellationReason}
                    </div>
                  )}

                  {h.observations && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 13,
                        color: "#4c1d95",
                        background: "#f5f3ff",
                        border: "1px solid #ddd6fe",
                        padding: "8px 10px",
                        borderRadius: 8,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <FaCommentDots style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ whiteSpace: "pre-wrap" }}>{h.observations}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientHistoryModal;
