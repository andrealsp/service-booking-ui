import styles from "./Construction.module.css";

function Construction({ page = "this section" }) {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden>
          🛠️
        </div>

        <header className={styles.header}>
          <h2 className={styles.title}>
            Page <span className={styles.highlight}>Under Construction</span>
          </h2>

          <p className={styles.description}>
            Our <strong>{page}</strong> is being prepared to deliver the best
            possible experience for you.
          </p>
        </header>
      </div>
    </section>
  );
}

export default Construction;
