import styles from "./Container.module.css";

function Container({ children, className = "", customClass = "" }) {
  const classes = [styles.container, className, customClass]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}

export default Container;
