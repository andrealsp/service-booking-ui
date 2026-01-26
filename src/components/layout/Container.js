import "../styles/Container.css";

function Container(props) {
  // Aqui usamos strings fixas e o valor que vem da prop
  return (
    <div className={`container ${props.customClass}`}>{props.children}</div>
  );
}

export default Container;
