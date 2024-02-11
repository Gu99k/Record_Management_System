import React from "react";
import Styles from "./Button.module.css";

const Button = (props) => {
  const { text, color, onClick, id } = props;
  return (
    <button
      type="text"
      className={`${Styles.DUV_Link} ${color}`}
      onClick={onClick}
      id={id}
    >
      {text}
    </button>
  );
};

export default Button;
