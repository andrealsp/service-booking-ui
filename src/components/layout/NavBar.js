import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Container from "./Container";

import "../styles/NavBar.css";
import logo from "../../img/logo.png";

function NavBar({ name }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="NavBar">
      <Container customClass="NavContainer">
        <div className="NavLeftGroup">
          <Link to="/">
            <img
              src={logo}
              alt="Appointments"
              style={{ width: "50px", height: "auto" }}
            />
          </Link>
          <div className="UserBadge">Hello, {name}</div>
        </div>

        <ul className="List">
          <li className="Item">
            <Link to="/">Home</Link>
          </li>
          <li className="Item">
            <Link to="/services">Services</Link>
          </li>
          <li className="Item">
            <Link to="/appointments">Appointments</Link>
          </li>
          <li className="Item">
            <button onClick={handleLogout} className="LogoutButton">
              Logout
            </button>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
