import { Link } from "react-router-dom";
import styles from "./SuccessModal.module.css";

function SuccessModal() {
  return (
    <section className={styles.SuccessPage}>
      <div className={styles.SuccessCard}>
        <h2>Account Created!</h2>
        <p>
          Your registration was successful. You can now access all the features
          of <span>NEXUS</span>.
        </p>
        <Link to="/login" className={styles.SuccessButton}>
          Go to Login
        </Link>
      </div>
    </section>
  );
}

export default SuccessModal;
