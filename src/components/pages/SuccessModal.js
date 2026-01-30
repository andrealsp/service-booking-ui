import { Link } from "react-router-dom";
import "../styles/SuccessModal.css";

function SuccessModal() {
  return (
    <section className="SuccessPage">
      <div className="SuccessCard">
        <h2>Account Created!</h2>
        <p>
          Your registration was successful. You can now access all the features
          of <span>NEXUS</span>.
        </p>
        <Link to="/login" className="SuccessButton">
          Go to Login
        </Link>
      </div>
    </section>
  );
}

export default SuccessModal;
