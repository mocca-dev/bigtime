import React from "react";
import PropTypes from "prop-types";

const TimeDisplay = ({ minutes, seconds, empty }) => (
  <div className={empty ? "time-display disabled" : "time-display"}>
    <span>{minutes}</span>
    <span>:{seconds}</span>
  </div>
);

export default TimeDisplay;

TimeDisplay.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired
};
