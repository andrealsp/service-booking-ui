import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaAddressCard, FaLock, FaInfoCircle } from "react-icons/fa";

import Input from "../../form/Input/Input.jsx";
import CpfInput from "../../form/CpfInput/CpfInput.jsx";
import PhoneInput from "../../form/PhoneInput/PhoneInput.jsx";
import LoginFooter from "../../layout/LoginFooter/LoginFooter.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import Button from "../../form/Button/Button.jsx";
import Logo from "../../brand/Logo/Logo.jsx";
import PasswordHints from "../Password/PasswordHints.jsx";

import { registerUser } from "@/services/authService";
import { isValidCpf, digits as cpfDigits } from "@/utils/cpf";
import { digits as phoneDigits } from "@/utils/phone";
import { validatePasswordClientSide } from "@/services/passwordService";

import styles from "./Signup.module.css";

function validate(formData) {
  const errors = {};
  if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
  if (!formData.givenName.trim())
    errors.givenName = "Preferred name is required.";
  if (!cpfDigits(formData.identificationDocument)) {
    errors.identificationDocument = "CPF is required.";
  } else if (!isValidCpf(formData.identificationDocument)) {
    errors.identificationDocument = "Invalid CPF — double-check the digits.";
  }
  if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
    errors.email = "Enter a valid email (must contain '@').";
  if (
    !formData.phoneNumber.trim() ||
    phoneDigits(formData.phoneNumber).length < 8
  )
    errors.phoneNumber = "Phone is required.";
  if (!formData.address.trim()) errors.address = "Address is required.";
  if (!formData.username.trim() || formData.username.length < 3)
    errors.username = "Username must be at least 3 characters.";
  const policyError = validatePasswordClientSide(formData.password);
  if (policyError) errors.password = policyError;
  if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = "Passwords do not match.";
  return errors;
}

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    givenName: "",
    identificationDocument: "",
    phoneNumber: "",
    email: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await registerUser(formData);
      setIsRegistered(true);
    } catch (err) {
      setSubmitError(err.message || "Error creating account");
    } finally {
      setSubmitting(false);
    }
  }

  if (isRegistered) return <SuccessModal />;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <Logo size={40} variant="wordmark" />
          </div>
          <h2 className={styles.title}>Create your client account</h2>
          <p className={styles.subtitle}>
            Three quick sections and you're in. Already a member?{" "}
            <Link to="/login">Sign in</Link>.
          </p>
        </header>

        <div className={styles.notice} role="note">
          <FaInfoCircle aria-hidden />
          <span>
            Public signup creates a <strong>Client</strong> account. Provider,
            Assistant and Admin accounts are managed internally by Admins or
            Assistants.
          </span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* ── Section 1 · Personal ── */}
          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaUser aria-hidden />
              <div>
                <h3>Who you are</h3>
                <p>Your basic identity on the platform.</p>
              </div>
            </header>

            <div className={styles.grid}>
              <Input
                label="Full name"
                type="text"
                name="fullName"
                placeholder="Andre Luis Santos Pereira"
                value={formData.fullName}
                onChange={handleChange}
                error={fieldErrors.fullName}
                required
              />
              <Input
                label="Preferred name"
                type="text"
                name="givenName"
                placeholder="Andre"
                value={formData.givenName}
                onChange={handleChange}
                error={fieldErrors.givenName}
                required
              />
            </div>

            <CpfInput
              name="identificationDocument"
              value={formData.identificationDocument}
              onChange={handleChange}
              error={fieldErrors.identificationDocument}
              required
            />
          </section>

          {/* ── Section 2 · Contact ── */}
          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaAddressCard aria-hidden />
              <div>
                <h3>How to reach you</h3>
                <p>Used for reminders and notifications.</p>
              </div>
            </header>

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              required
            />
            <PhoneInput
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={fieldErrors.phoneNumber}
              required
            />

            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="City, State / Country"
              value={formData.address}
              onChange={handleChange}
              error={fieldErrors.address}
              required
            />
          </section>

          {/* ── Section 3 · Account ── */}
          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaLock aria-hidden />
              <div>
                <h3>Account & access</h3>
                <p>Pick a username and a secure password.</p>
              </div>
            </header>

            <Input
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              error={fieldErrors.username}
              required
            />

            <div className={styles.grid}>
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                autoComplete="new-password"
                required
              />
              <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
                autoComplete="new-password"
                required
              />
            </div>

            {/*
              Same live checklist used on /change-password and /reset-password
              so the requirements are uniform across every place a password is
              chosen. The Rule items flip from ✗ to ✓ as the user types.
            */}
            <PasswordHints value={formData.password} />
          </section>

          {submitError && (
            <div className={styles.submitError}>{submitError}</div>
          )}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default Signup;
