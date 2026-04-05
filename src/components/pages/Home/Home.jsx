import Construction from "../../layout/Construction/Construction.jsx";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.HomeContainer}>
      <h1>
        Welcome to<span className={styles.HomeHighlight}>NEXUS</span>
      </h1>
      <Construction page="Home" />
    </section>
  );
}

export default Home;
