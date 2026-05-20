import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "@/services/authService";
import { getUserFromToken } from "@/services/tokenService";

import LoginFooter from "../../layout/LoginFooter/LoginFooter";
import Input from "../../form/Input/Input";
import Button from "../../form/Button/Button";
import Logo from "../../brand/Logo/Logo";

import styles from "./Login.module.css";

const BULLETS = [
  "Concurrency-safe slot reservation",
  "AI-suggested time slots that fit your day",
  "No-show predictions so you stay one step ahead",
];

function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(formData.identifier, formData.password);
      const me = getUserFromToken();
      if (me?.passwordChangeRequired) {
        navigate("/change-password", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  }

  return (
    <section className={styles.page}>
      <aside className={styles.side}>
        <header className={styles.sideHeader}>
          <Logo size={44} variant="wordmark" tone="inverse" />
        </header>

        <div>
          <h2 className={styles.sideHeadline}>
            Booking that just <span>works.</span>
          </h2>
          <p className={styles.sideBody}>
            NEXUS connects clients, providers and intelligent scheduling under a
            single, secure platform.
          </p>

          <ul className={styles.bullets}>
            {BULLETS.map((b) => (
              <li key={b} className={styles.bullet}>
                <span className={styles.bulletDot} aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.sideFooter}>
          © {new Date().getFullYear()} NEXUS · Crafted by Andre Luis
        </p>
      </aside>

      <div className={styles.formPanel}>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <div className={styles.cardMobileLogo}>
              <Logo size={40} variant="wordmark" />
            </div>
            <h1 className={styles.cardTitle}>Welcome back</h1>
            <p className={styles.cardSubtitle}>
              Sign in to manage your appointments.
            </p>
          </header>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input
              label="Username or email"
              type="text"
              name="identifier"
              placeholder="Your username or email"
              value={formData.identifier}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <div className={styles.error}>{error}</div>}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>

            <div className={styles.forgotRow}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>

            <div className={styles.divider}>or</div>

            <div className={styles.actions}>
              <Link to="/signup">Create a new account →</Link>
            </div>
          </form>

          <LoginFooter />
        </div>
      </div>
    </section>
  );
}

export default Login;
