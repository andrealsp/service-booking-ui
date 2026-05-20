import styles from "./EmptyState.module.css";

function EmptyState({ icon = "📭", title, description, action }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon} aria-hidden>
        {icon}
      </div>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
