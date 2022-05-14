import React from "react";

const Activity = ({ info }) => {
  return (
    <div className='scheduleItem'>
      <div className='circle'>
        <span className='circle__day'>{info.day}</span>
        <span className='circle__date'>{info.date}</span>
      </div>
      <h3 className='scheduleItem__info'>{info.city}</h3>
    </div>
  );
};

export default Activity;
