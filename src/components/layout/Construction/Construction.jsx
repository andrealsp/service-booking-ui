import React from "react";
import styles from "./Construction.module.css";

function Construction({ page }) {
  return (
    <section className={styles.ConstructionSection}>
      <div className={styles.ConstructionCard}>
        <div className={styles.ConstructionIcon}>🛠️</div>
        <header className={styles.ConstructionHeader}>
          <h2>
            Page <span>Under Construction</span>
          </h2>
          <p>
            Our <strong>{page}</strong> section is being prepared to deliver the
            best possible experience for you.
          </p>
        </header>
      </div>
    </section>
  );
}

export default Construction;
