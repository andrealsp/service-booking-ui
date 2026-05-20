import { useEffect, useState } from "react";
import {
  FaTimes,
  FaUser,
  FaAddressCard,
  FaLock,
  FaUserShield,
  FaBriefcase,
} from "react-icons/fa";

import Input from "../../form/Input/Input";
import CpfInput from "../../form/CpfInput/CpfInput";
import PhoneInput from "../../form/PhoneInput/PhoneInput";
import PasswordHints from "../Password/PasswordHints";
import { validatePasswordClientSide } from "@/services/passwordService";
import { isValidCpf, digits as cpfDigits } from "@/utils/cpf";
import { digits as phoneDigits } from "@/utils/phone";

import styles from "./UserForm.module.css";

const ROLES = [
  { id: "Client", label: "Client" },
  { id: "Provider", label: "Provider" },
  { id: "Assistant", label: "Assistant" },
  { id: "Admin", label: "Admin" },
];

const EMPTY = {
  fullName: "",
  givenName: "",
  identificationDocument: "",
  phoneNumber: "",
  email: "",
  address: "",
  username: "",
  password: "",
  role: "Client",
  position: "",
  serviceProvided: "",
};

function validate(form, editing) {
  const e = {};
  if (!form.fullName?.trim()) e.fullName = "Required";
  if (!form.givenName?.trim()) e.givenName = "Required";
  if (!cpfDigits(form.identificationDocument)) {
    e.identificationDocument = "CPF is required";
  } else if (!isValidCpf(form.identificationDocument)) {
    e.identificationDocument = "Invalid CPF — double-check the digits";
  }
  if (!form.phoneNumber?.trim() || phoneDigits(form.phoneNumber).length < 8)
    e.phoneNumber = "Phone is required";
  if (!form.email?.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
    e.email = "Valid email required (must contain '@')";
  if (!form.username?.trim() || form.username.length < 3)
    e.username = "Min 3 chars";

  // Password is collected ONLY on create. Edits go through the dedicated
  // "Reset password" flow from the Users page.
  if (!editing) {
    const policyError = validatePasswordClientSide(form.password);
    if (policyError) e.password = policyError;
  }

  if (!form.role) e.role = "Pick a role";

  // Role-specific required fields, mirroring the server-side validation.
  if (form.role === "Provider") {
    if (!form.position?.trim()) e.position = "Required for Provider";
    if (!form.serviceProvided?.trim())
      e.serviceProvided = "Required for Provider";
  } else if (form.role === "Assistant") {
    if (!form.position?.trim()) e.position = "Required for Assistant";
  }

  return e;
}

function UserForm({ initial, onSubmit, onClose, error, lockedRole = false }) {
  const editing = Boolean(initial);
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    ...(initial || {}),
    password: "",
  }));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // If `initial` arrives asynchronously (parent fetched after mount), sync it.
  useEffect(() => {
    if (initial) {
      setForm((p) => ({ ...EMPTY, ...initial, password: "" }));
    }
  }, [initial]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) {
      setErrors((p) => {
        const n = { ...p };
        delete n[name];
        return n;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form, editing);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  }

  const showProviderFields = form.role === "Provider";
  const showAssistantFields = form.role === "Assistant";
  const showPositionField = showProviderFields || showAssistantFields;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modal}>
        <header className={styles.head}>
          <h3>{editing ? "Edit user" : "Create user"}</h3>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaUser aria-hidden />
              <span>Identity</span>
            </header>
            <div className={styles.row}>
              <Input
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <Input
                label="Preferred name"
                name="givenName"
                value={form.givenName}
                onChange={handleChange}
                error={errors.givenName}
              />
            </div>
            <CpfInput
              name="identificationDocument"
              value={form.identificationDocument}
              onChange={handleChange}
              error={errors.identificationDocument}
            />
          </section>

          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaAddressCard aria-hidden />
              <span>Contact</span>
            </header>
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <PhoneInput
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="City, State / Country"
            />
          </section>

          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaLock aria-hidden />
              <span>{editing ? "Account" : "Credentials"}</span>
            </header>
            <div className={styles.row}>
              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                error={errors.username}
                disabled={editing}
              />
              {!editing && (
                <Input
                  label="Temporary password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  autoComplete="new-password"
                  placeholder="User will be asked to rotate it at first login"
                />
              )}
            </div>
            {/*
              On create, surface the same live policy checklist the user will
              see on reset / change-password screens — keeps the requirements
              consistent everywhere a password is chosen. Hidden on edit
              because the password isn't collected here (use "Reset password").
            */}
            {!editing && <PasswordHints value={form.password} />}
            {editing && (
              <p className={styles.editPasswordNote}>
                Use the <strong>“Reset password”</strong> button on the user
                list to change this user's password.
              </p>
            )}
          </section>

          <section className={styles.section}>
            <header className={styles.sectionHead}>
              <FaUserShield aria-hidden />
              <span>Role</span>
            </header>
            <div className={styles.roleRow}>
              {ROLES.map((r) => (
                <label
                  key={r.id}
                  className={`${styles.roleChip} ${
                    form.role === r.id ? styles.roleChipActive : ""
                  } ${lockedRole ? styles.roleChipLocked : ""}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.id}
                    checked={form.role === r.id}
                    onChange={handleChange}
                    disabled={lockedRole}
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
            {errors.role && (
              <span className={styles.errorMsg}>{errors.role}</span>
            )}
          </section>

          {showPositionField && (
            <section className={styles.section}>
              <header className={styles.sectionHead}>
                <FaBriefcase aria-hidden />
                <span>
                  {showProviderFields ? "Practice" : "Assignment"}
                </span>
              </header>

              <Input
                label={
                  showProviderFields
                    ? "Position / specialty"
                    : "Position (manager, coordinator, operator, …)"
                }
                name="position"
                value={form.position}
                onChange={handleChange}
                error={errors.position}
                placeholder={
                  showProviderFields
                    ? "e.g. Dentist · Orthodontist · Therapist"
                    : "e.g. Coordinator"
                }
              />

              {showProviderFields && (
                <Input
                  label="Service provided"
                  name="serviceProvided"
                  value={form.serviceProvided}
                  onChange={handleChange}
                  error={errors.serviceProvided}
                  placeholder="e.g. Orthodontic care · Pediatric dentistry"
                />
              )}
            </section>
          )}

          {error && <div className={styles.errorBox}>{error}</div>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.primary}
              disabled={submitting}
            >
              {submitting ? "Saving…" : editing ? "Save changes" : "Create user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
