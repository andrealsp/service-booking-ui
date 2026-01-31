import LoginFooter from "../layout/LoginFooter";
import Input from "../form/Input";
import SubmitButton from "../form/Button";

import "../styles/Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch(
        "http://localhost:8081/nexus/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.identifier,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) localStorage.setItem("token", data.token);

        navigate("/");
      } else {
        setErrorMessage({
          message: data.message || "Usuário ou senha inválidos.",
        });
      }
    } catch (error) {
      setErrorMessage({
        message: "Erro ao conectar com o servidor. Tente mais tarde.",
      });
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(null);
  }

  return (
    <section className="LoginPage">
      <div className="LoginCard">
        <div className="LoginHeader">
          <h2>
            <span>NEXUS</span>
          </h2>
          <p>Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit} className="LoginForm">
          <div className="FormGroup">
            <Input
              type="text"
              className={`FormInput ${errorMessage ? "error" : ""}`}
              id="identifier"
              text="Username/Email"
              name="identifier"
              placeholder="Type your username or email"
              value={formData.identifier}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className="FormGroup">
            <Input
              type="password"
              className={`FormInput ${errorMessage ? "error" : ""}`}
              id="password"
              text="Password"
              name="password"
              placeholder="Type your password"
              value={formData.password}
              handleChange={handleChange}
              required={true}
            />
          </div>
          {errorMessage && (
            <div className="ErrorMessage">{errorMessage.message}</div>
          )}
          <SubmitButton text="Login" />
          <div className="LoginActions">
            <a href="/signup">Create an account</a>
          </div>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default Login;
