import {
  FaCalendarAlt,
  FaClock,
  FaStickyNote,
  FaUserTie,
  FaUserAlt,
  FaCheck,
  FaBan,
  FaClipboardCheck,
  FaHistory,
  FaCommentDots,
  FaExclamationTriangle,
} from "react-icons/fa";

import StatusBadge from "../../feedback/StatusBadge/StatusBadge";
import { formatDate, formatTime, diffInMinutes } from "@/utils/datetime";

import styles from "./AppointmentCard.module.css";

function NoShowMeter({ probability }) {
  if (probability == null) return null;
  const pct = Math.round(probability * 100);
  let tone = "low";
  if (pct >= 70) tone = "high";
  else if (pct >= 40) tone = "medium";

  return (
    <div
      className={`${styles.noShow} ${styles[tone]}`}
      title="AI-estimated probability that the client will not show up"
    >
      <span className={styles.noShowLabel}>No-show risk</span>
      <span className={styles.noShowValue}>{pct}%</span>
    </div>
  );
}

/**
 * Resolve a "Provider Name" / "Client Name" line.
 *
 * Backend now always sends `providerName`/`clientName` alongside the IDs.
 * We keep the UUID as a quiet fallback (and as a hover tooltip) so the card
 * still works against older payloads or while data is in flight.
 */
function partyLine({ name, id, fallback }) {
  if (name && name.trim()) return { primary: name, tooltip: id };
  return { primary: fallback, tooltip: id };
}

function AppointmentCard({
  appointment,
  viewerRole,
  onConfirm,
  onCancel,
  onComplete,
  onShowHistory,
  busyAction,
}) {
  const duration = diffInMinutes(appointment.startAt, appointment.endAt);
  const isFinal =
    appointment.status === "CANCELLED" ||
    appointment.status === "COMPLETED" ||
    appointment.status === "NO_SHOW";

  const isProviderLike =
    viewerRole === "PROVIDER" ||
    viewerRole === "ASSISTANT" ||
    viewerRole === "ADMIN";

  // Only Provider / Assistant / Admin may approve. Clients can't self-approve.
  const canApprove =
    appointment.status === "PENDING_APPROVAL" && isProviderLike;

  // Only Provider / Assistant / Admin may complete, and only from CONFIRMED.
  const canComplete = appointment.status === "CONFIRMED" && isProviderLike;

  // Showing the visit history makes sense only when a provider-like viewer
  // is looking at a concrete client.
  const canShowHistory = isProviderLike && Boolean(appointment.clientId);

  const party =
    viewerRole === "CLIENT"
      ? {
          icon: FaUserTie,
          label: "Provider",
          ...partyLine({
            name: appointment.providerName,
            id: appointment.providerId,
            fallback: "Provider",
          }),
        }
      : {
          icon: FaUserAlt,
          label: "Client",
          ...partyLine({
            name: appointment.clientName,
            id: appointment.clientId,
            fallback: "Client",
          }),
        };

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <StatusBadge status={appointment.status} />
        <NoShowMeter probability={appointment.noShowProbability} />
      </div>

      {/*
        Awaiting-confirmation banner. Only shown for non-final appointments
        where the client confirmation flow is still PENDING. AUTO_CANCELLED
        appointments already carry the cancellation reason and don't need
        this — they're shown via the regular CANCELLED reason box.
      */}
      {!isFinal && appointment.confirmationStatus === "PENDING" && (
        <div className={styles.awaitingConfirm}>
          <FaExclamationTriangle aria-hidden />
          <div>
            <strong>Awaiting client confirmation</strong>
            <p>
              The client must confirm via SMS / WhatsApp / Email. Unconfirmed
              appointments are auto-cancelled at midnight on the day of the
              visit.
            </p>
          </div>
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.row}>
          <FaCalendarAlt className={styles.icon} aria-hidden />
          <span>{formatDate(appointment.startAt)}</span>
        </div>

        <div className={styles.row}>
          <FaClock className={styles.icon} aria-hidden />
          <span>
            {formatTime(appointment.startAt)} – {formatTime(appointment.endAt)}{" "}
            <span className={styles.muted}>({duration} min)</span>
          </span>
        </div>

        <div className={styles.row}>
          <party.icon className={styles.icon} aria-hidden />
          <span title={party.tooltip}>
            {party.label}: <strong>{party.primary}</strong>
          </span>
        </div>

        {appointment.notes && (
          <div className={styles.row}>
            <FaStickyNote className={styles.icon} aria-hidden />
            <span className={styles.notes}>{appointment.notes}</span>
          </div>
        )}

        {appointment.observations && (
          <div className={styles.observationsBox}>
            <FaCommentDots className={styles.icon} aria-hidden />
            <div>
              <strong>Visit observations</strong>
              <p className={styles.observationsText}>
                {appointment.observations}
              </p>
            </div>
          </div>
        )}

        {appointment.status === "CANCELLED" && appointment.cancellationReason && (
          <div className={styles.cancelReasonBox}>
            <strong>Cancellation reason:</strong> {appointment.cancellationReason}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {canApprove && (
          <button
            type="button"
            className={styles.confirm}
            onClick={() => onConfirm?.(appointment)}
            disabled={busyAction === "confirm"}
          >
            <FaCheck />
            {busyAction === "confirm" ? "Approving…" : "Approve"}
          </button>
        )}
        {canComplete && (
          <button
            type="button"
            className={styles.complete}
            onClick={() => onComplete?.(appointment)}
            disabled={busyAction === "complete"}
          >
            <FaClipboardCheck />
            {busyAction === "complete" ? "Completing…" : "Complete"}
          </button>
        )}
        {!isFinal && (
          <button
            type="button"
            className={styles.cancel}
            onClick={() => onCancel?.(appointment)}
            disabled={busyAction === "cancel"}
          >
            <FaBan />
            {busyAction === "cancel" ? "Cancelling…" : "Cancel"}
          </button>
        )}
        {canShowHistory && (
          <button
            type="button"
            className={styles.history}
            onClick={() => onShowHistory?.(appointment)}
          >
            <FaHistory />
            Client history
          </button>
        )}
      </div>
    </article>
  );
}

export default AppointmentCard;
