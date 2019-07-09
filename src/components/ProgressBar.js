import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progressWidth, onMouseDown, duration }) => {
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

  return (
    <div className="progress-bar-container" onMouseDown={e => onMouseDown(e)}>
      <span className="progress-bar" style={{ width: progressWidth + "vw" }} />
      {/* <div className="duration">{toTime(duration)}</div> */}
    </div>
  );
};

ProgressBar.propTypes = {
  progressWidth: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};

export default ProgressBar;
