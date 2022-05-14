import React from "react";

function Header({ formHeader }) {
  return (
    <div className='header'>
      <h1 className='header__title'>
        <i className='fas fa-umbrella-beach'></i>{" "}
        {formHeader ? "Vacation Planner" : "Your Itinerary"}{" "}
        <i className='fas fa-umbrella-beach'></i>
      </h1>
    </div>
  );
}

export default Header;
