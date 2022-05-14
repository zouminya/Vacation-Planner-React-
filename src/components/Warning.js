import React from "react";

const Warning = ({ message }) => {
  return <p className={message.theLook}>{message.content}</p>;
};

export default Warning;
