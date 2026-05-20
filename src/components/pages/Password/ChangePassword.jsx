import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";

import Input from "../../form/Input/Input";
import Button from "../../form/Button/Button";
import Logo from "../../brand/Logo/Logo";
import LoginFooter from "../../layout/LoginFooter/LoginFooter";
import PasswordHints from "./PasswordHints";

import {
  changePassword,
  validatePasswordClientSide,
} from "@/services/passwordService";
import { clearToken } from "@/services/authService";
import { getUserFromToken } from "@/services/tokenService";

import styles from "./PasswordPage.module.css";

function ChangePassword() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const forced = Boolean(user?.passwordChangeRequired);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError("Please confirm your current password.");
      return;
    }
    const policyError = validatePasswordClientSide(newPassword);
    if (policyError) {
      setError(policyError);
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from the current one.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setDone(true);
      // Force a fresh login so the new JWT no longer carries the forced flag.
      clearToken();
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError(err.message || "Could not change your password.");
    } finally {
      setSubmitting(false);
    }
  }

  /**
   * Voluntary visit → offer a way out (back to wherever the user came from,
   * falling back to home if there's no history). Forced rotations don't get
   * the back button — the spec is "you MUST set a new password before doing
   * anything else", and giving an escape hatch would just bounce the user
   * back here on every protected route load.
   */
  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        {!forced && (
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleBack}
            aria-label="Go back"
          >
            <FaArrowLeft aria-hidden />
            <span>Back</span>
          </button>
        )}
        <header className={styles.header}>
          <Logo size={40} variant="wordmark" />
          <h1 className={styles.title}>
            {forced ? "Set a new password" : "Change your password"}
          </h1>
          <p className={styles.subtitle}>
            {forced
              ? "Your administrator reset your password. Please pick a new one to continue."
              : "Pick a new password. You'll be signed out so the change takes effect."}
          </p>
        </header>

        {forced && (
          <div className={styles.notice} role="note">
            <FaInfoCircle aria-hidden />
            <span>
              Your previous password was set by an administrator. For your
              security, you must replace it before continuing.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label={forced ? "Temporary password" : "Current password"}
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
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
          {done && (
            <div className={styles.success}>
              Password updated. Redirecting to sign in…
            </div>
          )}

          <Button type="submit" disabled={submitting || done}>
            {submitting ? "Saving…" : "Update password"}
          </Button>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default ChangePassword;
