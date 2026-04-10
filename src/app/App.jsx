import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { getUserFromToken } from "@/services/tokenService";

import Container from "../components/layout/Container/Container";
import Home from "../components/pages/Home/Home";
import NavBar from "../components/layout/NavBar/NavBar";
import Footer from "../components/layout/Footer/Footer";
import Services from "../components/pages/Services/Services";
import Appointments from "../components/pages/Appointments/Appointments";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import ProtectedRoute from "../components/routing/ProtectedRoute/ProtectedRoute";

import "./App.module.css";

function AppLayout() {
  const token = localStorage.getItem("token");
  let name = "User";

  if (token) {
    const decoded = jwtDecode(token);
    name = decoded.given_name || "User";
  }

  const location = useLocation();

  const publicRoutes = ["/login", "/signup"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  console.log("Token", token);

  return (
    <div className="App">
      {!isPublicPage && <NavBar name={name} />}

      <Container customClass="MinHeight">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
          </Route>
        </Routes>
      </Container>

      {!isPublicPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
