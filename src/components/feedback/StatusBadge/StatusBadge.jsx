import styles from "./StatusBadge.module.css";

const STATUS_LABELS = {
  PENDING_APPROVAL: "Awaiting approval",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  NO_SHOW: "No-show",
};

function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status;
  const className = `${styles.badge} ${styles[status?.toLowerCase()] || ""}`;
  return <span className={className}>{label}</span>;
}

export default StatusBadge;
