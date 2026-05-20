import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Input from "../../form/Input/Input";
import Button from "../../form/Button/Button";
import Logo from "../../brand/Logo/Logo";
import LoginFooter from "../../layout/LoginFooter/LoginFooter";
import PasswordHints from "./PasswordHints";

import {
  resetPassword,
  validatePasswordClientSide,
} from "@/services/passwordService";

import styles from "./PasswordPage.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState(location.state?.identifier || "");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !code.trim()) {
      setError("Identifier and code are required.");
      return;
    }
    const policyError = validatePasswordClientSide(newPassword);
    if (policyError) {
      setError(policyError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword({
        identifier: identifier.trim(),
        code: code.trim(),
        newPassword,
      });
      setDone(true);
    } catch (err) {
      setError(err.message || "Could not reset your password.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className={styles.page}>
        <div className={styles.card}>
          <header className={styles.header}>
            <Logo size={40} variant="wordmark" />
            <h1 className={styles.title}>Password updated</h1>
            <p className={styles.subtitle}>
              Your new password is ready. Sign in to continue.
            </p>
          </header>
          <Button onClick={() => navigate("/login")}>Go to sign in</Button>
          <LoginFooter />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Logo size={40} variant="wordmark" />
          <h1 className={styles.title}>Reset your password</h1>
          <p className={styles.subtitle}>
            Type the 6-digit code we sent and pick a strong new password.
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Username or email"
            type="text"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <Input
            label="6-digit code"
            type="text"
            name="code"
            inputMode="numeric"
            placeholder="123456"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            required
          />

          <Input
            label="New password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <PasswordHints value={newPassword} />

          <Input
            label="Confirm new password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Reset password"}
          </Button>

          <p className={styles.actions}>
            <Link to="/forgot-password" className={styles.backLink}>
              ← Request a new code
            </Link>
          </p>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default ResetPassword;
