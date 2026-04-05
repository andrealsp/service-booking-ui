import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Container from "../Container/Container";

import styles from "./NavBar.module.css";
import logo from "@/assets/images/logo.png";

function NavBar({ name }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className={styles.NavBar}>
      <Container customClass={styles.NavContainer}>
        <div className={styles.NavLeftGroup}>
          <Link to="/">
            <img
              src={logo}
              alt="Appointments"
              style={{ width: "50px", height: "auto" }}
            />
          </Link>
          <div className={styles.UserBadge}>Hello, {name}</div>
        </div>

        <ul className={styles.List}>
          <li className={styles.Item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.Item}>
            <Link to="/services">Services</Link>
          </li>
          <li className={styles.Item}>
            <Link to="/appointments">Appointments</Link>
          </li>
          <li className={styles.Item}>
            <button onClick={handleLogout} className={styles.LogoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
