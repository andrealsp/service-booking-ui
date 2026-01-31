import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../form/Input";
import LoginFooter from "../layout/LoginFooter";
import SuccessModal from "./SuccessModal";
import SubmitButton from "../form/Button";

import "../styles/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
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
            username: formData.username,
            password: formData.password,
            email: formData.email,
            name: formData.name,
            role: "CUSTOMER",
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
    <section className="SignupPage">
      <div className="SignupCard">
        <div className="SignupHeader">
          <h2>Get Started</h2>
          <p>
            Create your account on <span>NEXUS</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="SignupForm">
          <div className="FormGroup">
            <Input
              className={`FormInput ${errorMessage ? "error" : ""}`}
              type="text"
              text="Name"
              name="name"
              placeholder="Type the name you prefer being called"
              handleChange={handleChange}
              value={formData.name}
              required={true}
            />
            <Input
              className={`FormInput ${errorMessage ? "error" : ""}`}
              type="text"
              text="Username"
              name="username"
              placeholder="Type your username"
              handleChange={handleChange}
              value={formData.username}
              required={true}
            />
            <Input
              className={`FormInput ${errorMessage ? "error" : ""}`}
              type="text"
              text="Email"
              name="email"
              placeholder="Type your email"
              handleChange={handleChange}
              value={formData.email}
              required={true}
            />
            <Input
              className={`FormInput ${errorMessage ? "error" : ""}`}
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
              className={`FormInput ${errorMessage ? "error" : ""}`}
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
            <div className="ErrorMessage">{errorMessage.message}</div>
          )}

          <SubmitButton text="Create Account" />
          <div className="SignupActions">
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
