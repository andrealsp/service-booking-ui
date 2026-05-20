import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

import { clearToken } from "@/services/authService";
import { getUserFromToken } from "@/services/tokenService";
import Logo from "../../brand/Logo/Logo";

import styles from "./NavBar.module.css";

const NAV_BASE = [
  { to: "/", label: "Home", roles: null },
  { to: "/services", label: "Services", roles: null },
  { to: "/appointments", label: "Appointments", roles: null },
  { to: "/users", label: "Users", roles: ["ADMIN", "ASSISTANT"] },
  { to: "/change-password", label: "Password", roles: null },
];

function rawRole(role) {
  return (role || "").replace(/^ROLE_/, "").toUpperCase();
}

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const user = getUserFromToken();
  const role = rawRole(user?.role);

  const items = NAV_BASE.filter((i) => !i.roles || i.roles.includes(role));

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const close = () => setOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.logoLink}
          onClick={close}
          aria-label="NEXUS home"
        >
          <Logo size={36} variant="wordmark" />
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`${styles.list} ${open ? styles.listOpen : ""}`}>
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={close}
                className={`${styles.link} ${
                  isActive(item.to) ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.logout}
              aria-label="Logout"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
