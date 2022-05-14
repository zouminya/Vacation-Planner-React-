import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import LabelInput from "./LabelInput";
import Button from "./Button";
import Warning from "./Warning";
import { v4 as uuidv4 } from "uuid";

function Form({ showItinerary, getInputFieldArr, getInfoArr, addDataArr }) {
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("info")) || {
      country: "",
      departureCity: "",
      returnCity: "",
      departureDate: "",
      returnDate: "",
    }
  );

  const inputData = {
    id: uuidv4(),
    city: "",
    days: "",
  };

  const [inputFieldData, setInputFieldData] = useState([inputData]);
  const [message, setMessage] = useState({
    content: "* All the fields need to be filled",
    theLook: "warning",
  });

  //adding input field for city and day
  function addInputField() {
    setInputFieldData((oldData) => [...oldData, inputData]);
  }
  //deleting input field for city and day
  function deleteInputField(id) {
    if (inputFieldData.length === 1) {
      setInputFieldData((oldData) => {
        oldData[0] = inputData;
        return [...oldData];
      });
    } else {
      const newInputArr = inputFieldData.filter((data) => data.id !== id);
      setInputFieldData(newInputArr);
    }
  }

  //get the updated data for entered city and day info
  function updateItinerary(data, index) {
    setInputFieldData((oldData) => {
      oldData[index] = data;
      getInputFieldArr(inputFieldData);
      return [...oldData];
    });
  }

  // const cityArr = inputFieldData.map((data) => data.city);
  const daysArr = inputFieldData.map((data) => data.days);

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
    getInfoArr(info);
  }
  //update storage with new entered data
  useEffect(() => {
    localStorage.setItem("info", JSON.stringify(info));
  }, [
    info.departureDate,
    info.returnCity,
    info.returnDate,
    info.returnDate,
    info,
  ]);
  //calculation of difference time in days
  function differenceInDays(departureDate, returnDate) {
    const departureDay = new Date(departureDate);
    const returnDay = new Date(returnDate);
    const differenceInTime = returnDay.getTime() - departureDay.getTime();
    const planingDays = differenceInTime / (1000 * 3600 * 24) + 1;
    return planingDays;
  }

  //next button handler
  function submitForm(e) {
    e.preventDefault();
    const planningDays = differenceInDays(info.departureDate, info.returnDate);
    let travelDays;
    const daysNumArr = daysArr.map((day) => parseInt(day));
    if (daysArr.length === 1) {
      travelDays = daysNumArr[0];
    } else {
      travelDays = daysNumArr.reduce((a, b) => a + b, 0);
    }

    if (planningDays > travelDays) {
      setMessage({ content: "More Days/Places To Plan", theLook: "red" });
      setTimeout(
        () =>
          setMessage({
            content: "* All the fields need to be filled",
            theLook: "warning",
          }),
        4000
      );
    }

    if (planningDays < travelDays) {
      setMessage({
        content: "Plan For Too Many Days, Need To Shrink Your Plan",
        theLook: "red",
      });
      setTimeout(
        () =>
          setMessage({
            content: "* All the fields need to be filled",
            theLook: "warning",
          }),
        4000
      );
    }

    if (
      info.departureDate &&
      info.returnCity &&
      info.returnDate &&
      info.returnDate &&
      planningDays === travelDays
    ) {
      showItinerary();
      addDataArr();
    } else {
      return;
    }
  }

  return (
    <form className='form form-grid' onSubmit={submitForm}>
      <LabelInput
        htmlFor='country'
        label='Country to Visit'
        type='text'
        id='country'
        value={info.country}
        onChange={handleChange}
        name='country'
        placeholder='Enter a country'
      />
      <div className='groupItems'>
        <LabelInput
          htmlFor='departureCity'
          label='Departure City'
          type='text'
          id='departureCity'
          value={info.departureCity}
          onChange={handleChange}
          name='departureCity'
          placeholder='Enter a city'
          theLook={true}
        />
        <LabelInput
          htmlFor='returnCity'
          label='Return City'
          type='text'
          id='returnCity'
          value={info.returnCity}
          onChange={handleChange}
          name='returnCity'
          placeholder='Enter a city'
        />
      </div>
      <div className='groupItems'>
        <LabelInput
          htmlFor='departureDate'
          label='Departure Date'
          type='date'
          id='departureDate'
          value={info.departureDate}
          onChange={handleChange}
          name='departureDate'
          theLook={true}
        />
        <LabelInput
          htmlFor='returnDate'
          label='Return Date'
          type='date'
          id='returnDate'
          value={info.returnDate}
          onChange={handleChange}
          name='returnDate'
        />
      </div>
      <div className='groupItems'>
        <label
          className='
      textField__label textField__label--left textField--marginLeft
      required'
        >
          Add City
        </label>
        <div className='flex'>
          <label className='textField__label required'>Add Day</label>
          <Button
            type='button'
            theLook='btn btn--add'
            onClick={addInputField}
            text='+ City'
          />
        </div>
      </div>
      <div className='cityAndDays'>
        {inputFieldData.length === 0 && (
          <h5>Click Add button to Add City And Days</h5>
        )}
        {inputFieldData.length !== 0 &&
          inputFieldData.map((input, index) => {
            return (
              <InputField
                index={index}
                key={input.id}
                id={input.id}
                deleteBtn={true}
                deleteInput={deleteInputField}
                updateData={updateItinerary}
              />
            );
          })}
      </div>
      <button type='submit' className='btn btn--next-success'>
        Next
      </button>
      <Warning message={message} />
    </form>
  );
}

export default Form;
