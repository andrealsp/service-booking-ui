import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../Container/Container";

import { clearToken } from "@/services/authService";

import styles from "./NavBar.module.css";
import logo from "@/assets/images/logo.png";

function NavBar({ name }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <Container customClass={styles.navContainer}>
        <div className={styles.leftGroup}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="Nexus logo" className={styles.logo} />
          </Link>

          <div className={styles.userBadge}>
            Hello, <span> {name}</span>
          </div>
        </div>

        <ul className={styles.list}>
          <li>
            <Link
              to="/"
              className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/services"
              className={`${styles.link} ${
                isActive("/services") ? styles.active : ""
              }`}
            >
              Services
            </Link>
          </li>

          <li>
            <Link
              to="/appointments"
              className={`${styles.link} ${
                isActive("/appointments") ? styles.active : ""
              }`}
            >
              Appointments
            </Link>
          </li>

          <li>
            <button onClick={handleLogout} className={styles.logout}>
              Logout
            </button>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
