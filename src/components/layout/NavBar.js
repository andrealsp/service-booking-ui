import { Link } from "react-router-dom";

import Container from "./Container";

import "../styles/NavBar.css";
import logo from "../../img/logo.png";

function NavBar({ name }) {
  return (
    <nav className="navBar">
      <Container customClass="nav_container">
        <div className="nav_left_group">
          <Link to="/">
            <img
              src={logo}
              alt="Appointments"
              style={{ width: "50px", height: "auto" }}
            />
          </Link>
          <div className="user_badge">Hello, {name}</div>
        </div>

        <ul className="list">
          <li className="item">
            <Link to="/">Home</Link>
          </li>
          <li className="item">
            <Link to="/services">Services</Link>
          </li>
          <li className="item">
            <Link to="/appointments">Appointments</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default NavBar;
