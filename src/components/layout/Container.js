import "../styles/Container.css";

function Container(props) {
  return (
    <div className={`Container ${props.customClass}`}>{props.children}</div>
  );
}

export default Container;
