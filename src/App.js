import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Container from "./components/layout/Container";

import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Services from "./components/pages/Services";
import Appointments from "./components/pages/Appointments";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProtectedRoute from "./components/services/ProtectedRoute";

import "./App.css";

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
        if (!isPublicPage) {
          navigate("/login");
        }
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8081/bookingManagement/v1/auth/validateToken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token.startsWith("Bearer ")
                ? token
                : `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const noBearerToken = token.replace(/^Bearer\s+/i, "");
          const decoded = jwtDecode(noBearerToken);
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
