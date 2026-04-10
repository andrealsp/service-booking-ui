import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../form/Input/Input.jsx";
import LoginFooter from "../../layout/LoginFooter/LoginFooter.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import Button from "../../form/Button/Button.jsx";

import { registerUser } from "@/services/authService";

import styles from "./Signup.module.css";

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

  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      setIsRegistered(true);
    } catch (err) {
      setError(err.message || "Error creating account");
    }
  }

  if (isRegistered) {
    return <SuccessModal />;
  }

  const inputClass = `${styles.input} ${error ? styles.error : ""}`;

  return (
    <section className={styles.signupPage}>
      <div className={styles.signupCard}>
        <header className={styles.signupHeader}>
          <h2>Get Started</h2>
          <p>
            Create your account on <span>NEXUS</span>
          </p>
        </header>

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          {/* Personal Info */}
          <div className={styles.section}>
            <h3>Personal Info</h3>

            <Input
              className={inputClass}
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              className={inputClass}
              type="text"
              name="givenName"
              placeholder="Preferred name"
              value={formData.givenName}
              onChange={handleChange}
              required
            />

            <Input
              className={inputClass}
              type="text"
              name="identificationDocument"
              placeholder="Document number"
              value={formData.identificationDocument}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div className={styles.section}>
            <h3>Contact</h3>

            <Input
              className={inputClass}
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              className={inputClass}
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <Input
              className={inputClass}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Credentials */}
          <div className={styles.section}>
            <h3>Credentials</h3>

            <Input
              className={inputClass}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input
              className={inputClass}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <Input
              className={inputClass}
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Button type="submit">Create Account</Button>

          <div className={styles.signupActions}>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>

        <LoginFooter />
      </div>
    </section>
  );
}

export default Signup;
