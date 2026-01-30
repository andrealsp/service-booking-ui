import "../styles/Input.css";

function Input({
  className,
  type,
  text,
  name,
  placeholder,
  handleChange,
  value,
}) {
  return (
    <div className="FormGroup">
      <label htmlFor={name}>{text}: </label>
      <input
        className={className}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value || ""}
        required
      />
    </div>
  );
}

export default Input;
