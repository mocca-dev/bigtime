import React from "react";
import PropTypes from "prop-types";

const TimeDisplay = ({ minutes, seconds }) => (
  <div className="time-display">
    <span>{minutes}</span>
    <span>:{seconds}</span>
  </div>
);

TimeDisplay.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired
};

export default TimeDisplay;
