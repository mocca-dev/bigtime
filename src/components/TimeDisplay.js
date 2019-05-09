import React from "react";

const TimeDisplay = ({ minutes, seconds }) => (
  <div className="time-display">
    <span>{minutes}</span>
    <span>:{seconds}</span>
  </div>
);

export default TimeDisplay;
