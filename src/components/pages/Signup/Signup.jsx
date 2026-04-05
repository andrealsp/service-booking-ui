import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../layout/form/Input/Input.jsx";
import LoginFooter from "../../layout/LoginFooter/LoginFooter.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import SubmitButton from "../../layout/form/Button/Button.jsx";

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
    role: "Client",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage({ message: "Unmatched passwords" });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/nexus/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            givenName: formData.givenName,
            identificationDocument: formData.identificationDocument,
            contact: {
              phoneNumber: formData.phoneNumber,
              email: formData.email,
              address: formData.address,
            },
            username: formData.username,
            password: formData.password,
            role: formData.role,
          }),
        },
      );

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        setIsRegistered(true);
      } else {
        console.warn("Backend error:", data.message);
        setErrorMessage({
          message: data.message || "Error to create account.",
        });
      }
    } catch (error) {
      console.error("Fatal error during request:", error);
      setErrorMessage({
        message: "Error connecting to server. Try again later.",
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

  if (isRegistered) {
    return <SuccessModal />;
  }

  return (
    <section className={styles.SignupPage}>
      <div className={styles.SignupCard}>
        <div className={styles.SignupHeader}>
          <h2>Get Started</h2>
          <p>
            Create your account on <span>NEXUS</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.SignupForm}>
          <div className={styles.FormGroup}>
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="Full Name"
              name="fullName"
              placeholder="Type your full name"
              handleChange={handleChange}
              value={formData.fullName}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="How do you want to be called"
              name="givenName"
              placeholder="Type the name you prefer being called"
              handleChange={handleChange}
              value={formData.givenName}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="Username"
              name="username"
              placeholder="Type your username"
              handleChange={handleChange}
              value={formData.username}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="Identification Document Number"
              name="identificationDocument"
              placeholder="Type your identification document number"
              handleChange={handleChange}
              value={formData.identificationDocument}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="Email"
              name="email"
              placeholder="Type your email"
              handleChange={handleChange}
              value={formData.email}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="Phone Number"
              name="phoneNumber"
              placeholder="Type your phone number"
              handleChange={handleChange}
              value={formData.phoneNumber}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="text"
              text="Address"
              name="address"
              placeholder="Type your address"
              handleChange={handleChange}
              value={formData.address}
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="password"
              text="Password"
              name="password"
              placeholder="Type your password"
              handleChange={handleChange}
              value={formData.password}
              autoComplete="new-password"
              required={true}
            />
            <Input
              className={
                styles.FormInput + (errorMessage ? " " + styles.error : "")
              }
              type="password"
              text="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              handleChange={handleChange}
              value={formData.confirmPassword}
              autoComplete="new-password"
              required={true}
            />
          </div>

          {errorMessage && (
            <div className={styles.ErrorMessage}>{errorMessage.message}</div>
          )}

          <SubmitButton text="Create Account" />
          <div className={styles.SignupActions}>
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
