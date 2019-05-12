import React from "react";

const ProgressBar = ({ progressWidth, onMouseDown }) => {
  return (
    <div className="progress-bar-container" onMouseDown={e => onMouseDown(e)}>
      <span className="progress-bar" style={{ width: progressWidth + "vw" }} />
    </div>
  );
};

export default ProgressBar;
