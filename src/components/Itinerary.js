import React from "react";
import Activity from "./Activity";
import Button from "./Button";
import Header from "./Header";

function Itinerary({ dataArr, showForm }) {
  return (
    <div className='container'>
      <Header formHeader={false} />
      <div className='schedule'>
        {dataArr.map((data, index) => {
          return <Activity key={index} info={data} />;
        })}
      </div>
      <Button
        type='button'
        theLook='btn btn--edit'
        onClick={showForm}
        text='Edit Itinerary'
      />
    </div>
  );
}

export default Itinerary;
