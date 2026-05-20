import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaSms,
  FaArrowRight,
  FaUserCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import Input from "../../form/Input/Input";
import Button from "../../form/Button/Button";
import Logo from "../../brand/Logo/Logo";
import LoginFooter from "../../layout/LoginFooter/LoginFooter";

import { recoverUsername, requestResetCode } from "@/services/passwordService";

import styles from "./PasswordPage.module.css";

const MODE_PASSWORD = "password";
const MODE_USERNAME = "username";

function ForgotPassword() {
  const navigate = useNavigate();

  const [mode, setMode] = useState(MODE_PASSWORD);

  // ── Password reset state
  const [identifier, setIdentifier] = useState("");
  const [channel, setChannel] = useState("EMAIL");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ── Username recovery state
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverResult, setRecoverResult] = useState(null);
  const [recoverError, setRecoverError] = useState(null);
  const [recoverSubmitting, setRecoverSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!identifier.trim()) {
      setError("Tell us your username or email so we can find your account.");
      return;
    }
    setSubmitting(true);
    try {
      await requestResetCode(identifier.trim(), channel);
      navigate("/reset-password", {
        state: { identifier: identifier.trim(), channel },
      });
    } catch (err) {
      setError(
        err.message || "Could not request a code. Try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRecoverSubmit(e) {
    e.preventDefault();
    setRecoverError(null);
    setRecoverResult(null);
    if (!/^\S+@\S+\.\S+$/.test(recoverEmail.trim())) {
      setRecoverError("Please type a valid email.");
      return;
    }
    setRecoverSubmitting(true);
    try {
      const res = await recoverUsername(recoverEmail.trim());
      setRecoverResult(res);
    } catch (err) {
      setRecoverError(
        err.message || "Could not recover your username right now.",
      );
    } finally {
      setRecoverSubmitting(false);
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Logo size={40} variant="wordmark" />
          <h1 className={styles.title}>
            {mode === MODE_PASSWORD
              ? "Forgot your password?"
              : "Forgot your username?"}
          </h1>
          <p className={styles.subtitle}>
            {mode === MODE_PASSWORD
              ? "Tell us how to find you and we'll send a 6-digit code so you can create a new one."
              : "Type the email you used to register and we'll show you the username linked to it."}
          </p>
        </header>

        <div className={styles.modeTabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === MODE_PASSWORD}
            className={`${styles.modeTab} ${
              mode === MODE_PASSWORD ? styles.modeTabActive : ""
            }`}
            onClick={() => setMode(MODE_PASSWORD)}
          >
            Reset password
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === MODE_USERNAME}
            className={`${styles.modeTab} ${
              mode === MODE_USERNAME ? styles.modeTabActive : ""
            }`}
            onClick={() => setMode(MODE_USERNAME)}
          >
            Forgot username
          </button>
        </div>

        {mode === MODE_PASSWORD && (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input
              label="Username or email"
              type="text"
              name="identifier"
              placeholder="Your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <fieldset className={styles.channelGroup}>
              <legend>Send the code via</legend>
              <label
                className={`${styles.channelOption} ${
                  channel === "EMAIL" ? styles.channelActive : ""
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="EMAIL"
                  checked={channel === "EMAIL"}
                  onChange={(e) => setChannel(e.target.value)}
                />
                <FaEnvelope />
                <span>Email</span>
              </label>
              <label
                className={`${styles.channelOption} ${
                  channel === "SMS" ? styles.channelActive : ""
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value="SMS"
                  checked={channel === "SMS"}
                  onChange={(e) => setChannel(e.target.value)}
                />
                <FaSms />
                <span>SMS</span>
              </label>
            </fieldset>

            {error && <div className={styles.error}>{error}</div>}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send code"}
            </Button>

            <p className={styles.actions}>
              <Link to="/login" className={styles.backLink}>
                ← Back to sign in
              </Link>
              <Link to="/reset-password" className={styles.haveCodeLink}>
                I already have a code <FaArrowRight />
              </Link>
            </p>
          </form>
        )}

        {mode === MODE_USERNAME && (
          <form
            onSubmit={handleRecoverSubmit}
            className={styles.form}
            noValidate
          >
            <Input
              label="Registered email"
              type="email"
              name="email"
              placeholder="Your email"
              value={recoverEmail}
              onChange={(e) => setRecoverEmail(e.target.value)}
              required
            />

            {recoverError && <div className={styles.error}>{recoverError}</div>}

            {recoverResult?.found && (
              <div className={styles.successBox}>
                <FaCheckCircle aria-hidden />
                <div>
                  <strong>Found it!</strong> Your username is{" "}
                  <code className={styles.usernameChip}>
                    <FaUserCircle aria-hidden /> {recoverResult.username}
                  </code>
                </div>
              </div>
            )}

            {recoverResult && !recoverResult.found && (
              <div className={styles.warningBox}>
                <FaExclamationCircle aria-hidden />
                <span>
                  We couldn't find any account registered with this email.{" "}
                  <Link to="/signup">Create one</Link>?
                </span>
              </div>
            )}

            <Button type="submit" disabled={recoverSubmitting}>
              {recoverSubmitting ? "Looking up…" : "Find my username"}
            </Button>

            <p className={styles.actions}>
              <Link to="/login" className={styles.backLink}>
                ← Back to sign in
              </Link>
            </p>
          </form>
        )}

        <LoginFooter />
      </div>
    </section>
  );
}

export default ForgotPassword;
