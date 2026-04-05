import LoginFooter from "../../layout/LoginFooter/LoginFooter.jsx";
import Input from "../../layout/form/Input/Input.jsx";
import SubmitButton from "../../layout/form/Button/Button.jsx";

import styles from "./Login.module.css";

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
      console.log(data);
      if (response.ok && data.token) {
        // Limpa o prefixo caso o backend envie
        const tokenLimpo = data.token.replace(/^Bearer\s+/i, "");
        localStorage.setItem("token", tokenLimpo);
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
    <section className={styles.LoginPage}>
      <div className={styles.LoginCard}>
        <div className={styles.LoginHeader}>
          <h2>
            <span>NEXUS</span>
          </h2>
          <p>Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.LoginForm}>
          <div className={styles.FormGroup}>
            <Input
              type="text"
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              id="identifier"
              text="Username/Email"
              name="identifier"
              placeholder="Type your username or email"
              value={formData.identifier}
              handleChange={handleChange}
              required={true}
            />
          </div>
          <div className={styles.FormGroup}>
            <Input
              type="password"
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
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
            <div className={styles.ErrorMessage}>{errorMessage.message}</div>
          )}
          <SubmitButton text="Login" />
          <div className={styles.LoginActions}>
            <a href="/signup">Create an account</a>
          </div>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default Login;
