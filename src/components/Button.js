import React from "react";

const Button = ({ type, theLook, onClick, text }) => {
  return (
    <button type={type} className={theLook} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  onClick: "",
};

export default Button;
