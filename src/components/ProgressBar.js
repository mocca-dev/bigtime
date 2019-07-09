import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progressWidth, onMouseDown }) => {
  return (
    <div className="progress-bar-container" onMouseDown={e => onMouseDown(e)}>
      <span className="progress-bar" style={{ width: progressWidth + "vw" }} />
    </div>
  );
};

ProgressBar.propTypes = {
  progressWidth: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired
};

export default ProgressBar;
