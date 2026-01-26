import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

import Container from "./components/layout/Container";

import Home from "./components/pages/Home";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Services from "./components/pages/Services";
import Appointments from "./components/pages/Appointments";

function App() {
  const [name, setName] = useState("Carregando...");

  useEffect(() => {
    fetch("/data/user.json")
      .then((response) => response.json())
      .then((data) => setName(data.name))
      .catch((err) => console.error("Erro ao carregar nome", err));
  }, []);

  //Quando tiver o token coletado:

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);

  //       setName(decoded.name);
  //     } catch (error) {
  //       console.error("Token inválido ou expirado", error);
  //       setName("Usuário");
  //     }
  //   }
  // }, []);

  return (
    <Router>
      <NavBar name={name} />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/appointments" element={<Appointments />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
