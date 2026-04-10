import styles from "./LoginFooter.module.css";

function LoginFooter({
  author = "Andre Luis",
  year = new Date().getFullYear(),
}) {
  return (
    <div className={styles.footer}>
      <p className={styles.text}>
        Developed by <span className={styles.author}>{author}</span> &copy;{" "}
        {year}
      </p>
    </div>
  );
}

export default LoginFooter;
