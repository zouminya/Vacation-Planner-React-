import React from "react";

const Input = ({ placeholder, refs }) => {
  return (
    <input
      type='text'
      className='textField__input'
      placeholder={`Enter ${placeholder}`}
      ref={refs}
    />
  );
};

export default Input;
