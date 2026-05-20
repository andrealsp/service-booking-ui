import styles from "./Spinner.module.css";

function Spinner({ label = "Loading", size = "md", inline = false }) {
  return (
    <div
      className={`${styles.wrap} ${styles[size] || ""} ${inline ? styles.inline : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

export default Spinner;
