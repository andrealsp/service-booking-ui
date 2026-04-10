import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "@/services/authService";

import LoginFooter from "../../layout/LoginFooter/LoginFooter";
import Input from "../../form/Input/Input";
import Button from "../../form/Button/Button";

import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await login(formData.identifier, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError(null);
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h2>
            <span>NEXUS</span>
          </h2>
          <p>Welcome Back</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            name="identifier"
            placeholder="Username or email"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit">Login</Button>

          <div className={styles.actions}>
            <Link to="/signup">Create an account</Link>
          </div>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default Login;
