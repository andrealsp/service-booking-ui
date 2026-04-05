import styles from "./Button.module.css";

function Button({ text }) {
  return (
    <div>
      <button className={styles.Button}>{text}</button>
    </div>
  );
}

export default Button;
