import React from "react";

const ProgressBar = ({
  progressWidth,
  onMouseMove,
  onMouseDown,
  onMouseUp
}) => {
  return (
    <div
      className="progress-bar-container"
      onMouseMove={e => onMouseMove(e)}
      onMouseDown={e => onMouseDown(e)}
      onMouseUp={e => onMouseUp(e)}
    >
      <span className="progress-bar" style={{ width: progressWidth + "vw" }} />
    </div>
  );
};

export default ProgressBar;
