import classes from "./Button.module.css";


const Button = (props) => {
  console.log(props.addclassName);
  return (
    <button
      className={`${classes.but} ${props.addclassName}`}
      onClick={props.onClick}
    >
      
      {props.children}
    </button>
  );
};

export default Button;
