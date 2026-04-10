import styles from "./Input.module.css";

function Input({
  type = "text",
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error = null,
}) {
  return (
    <div className={styles.group}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        required={required}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default Input;
