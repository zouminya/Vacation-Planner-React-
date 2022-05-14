import React from "react";

const LabelInput = ({
  htmlFor,
  label,
  type,
  id,
  value,
  onChange,
  name,
  placeholder,
  theLook,
}) => {
  return (
    <div className={theLook ? "textField textField--marginLeft" : "textField"}>
      <label htmlFor={htmlFor} className='textField__label required'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className='textField__input'
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabelInput;
