import Construction from "../../layout/Construction/Construction";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>NEXUS</span>
        </h1>
      </header>

      <div className={styles.content}>
        <Construction page="Home" />
      </div>
    </section>
  );
}

export default Home;
