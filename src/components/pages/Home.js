import Construction from "../layout/Construction";
import "../styles/Home.css";

function Home() {
  return (
    <section className={"HomeContainer"}>
      <h1>
        Welcome to<span>NEXUS</span>
      </h1>
      <Construction page="Home" />
    </section>
  );
}

export default Home;
