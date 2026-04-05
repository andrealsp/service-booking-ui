import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Container from "../components/layout/Container/Container.jsx";

import Home from "../components/pages/Home/Home.jsx";
import NavBar from "../components/layout/NavBar/NavBar.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";
import Services from "../components/pages/Services/Services.jsx";
import Appointments from "../components/pages/Appointments/Appointments.jsx";
import Login from "../components/pages/Login/Login.jsx";
import Signup from "../components/pages/Signup/Signup.jsx";
import ProtectedRoute from "../components/services/ProtectedRoute/ProtectedRoute.jsx";

import "./App.module.css";

function AppContent() {
  const [name, setName] = useState("Loading...");

  const location = useLocation();
  const navigate = useNavigate();

  const publicRoutes = ["/login", "/signup"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  useEffect(() => {
    const validateUserToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (!isPublicPage) navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8081/nexus/v1/auth/validate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const decoded = jwtDecode(token);
          setName(decoded.name || "Usuário");
        } else {
          throw new Error("Token inválido");
        }
      } catch (error) {
        console.error("Erro de autenticação:", error);
        localStorage.removeItem("token");
        if (!isPublicPage) navigate("/login");
      }
    };

    validateUserToken();
  }, [location.pathname, navigate, isPublicPage]);

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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
