import React, { Fragment } from "react";
import PropTypes from "prop-types";

const toTime = duration => {
  let minutes, seconds;
  if (!isNaN(duration)) {
    minutes = "0" + Math.floor(duration / 60);

    if (duration < 60) {
      seconds =
        duration < 10 ? "0" + Math.floor(duration) : Math.floor(duration);
    } else {
      seconds =
        duration % 60 < 10
          ? "0" + Math.floor(duration % 60)
          : "" + Math.floor(duration % 60);
    }
    seconds = seconds.toString();
    return minutes + ":" + seconds;
  } else {
    return "00:00";
  }
};

const TimeDisplay = ({ minutes, seconds, empty, duration }) => (
  <Fragment>
    <div className={empty ? "time-display disabled" : "time-display"}>
      <span>{minutes}</span>
      <span>:{seconds}</span>
    </div>
    <div className="duration">{toTime(duration)}</div>
  </Fragment>
);

export default TimeDisplay;

TimeDisplay.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
};
