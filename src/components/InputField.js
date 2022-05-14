import React, { useState, useEffect } from "react";

export const InputField = ({
  deleteBtn,
  deleteInput,
  index,
  id,
  updateData,
}) => {
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");

  useEffect(() => {
    updateData({ city, days, id }, index);
  }, [city, days, id, index]);

  return (
    <div className='groupItems'>
      <span
        className={deleteBtn ? "btn--delete" : ""}
        onClick={() => deleteInput(id)}
      >
        X
      </span>
      <div className='textField textField--marginLeft'>
        <input
          type='text'
          className='textField__input'
          placeholder='Enter City'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div className='textField'>
        <input
          type='text'
          className='textField__input'
          placeholder='Enter Days'
          value={days}
          onChange={(e) => {
            setDays(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
