import { useEffect } from "react";
import styles from "./Toast.module.css";

function Toast({ message, variant = "info", onDismiss, duration = 4000 }) {
  useEffect(() => {
    if (!message || !duration) return undefined;
    const id = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(id);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className={`${styles.toast} ${styles[variant] || ""}`} role="status">
      <span className={styles.message}>{message}</span>
      <button
        type="button"
        className={styles.close}
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
