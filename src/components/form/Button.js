import "../styles/Button.css";

function Button({ text }) {
  return (
    <div>
      <button className="Button">{text}</button>
    </div>
  );
}

export default Button;
