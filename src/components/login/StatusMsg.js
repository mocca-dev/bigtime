import React from "react";

const StatusMsg = ({ color, content }) => {
  return <div className={"status-msg-container " + color}>{content}</div>;
};

export default StatusMsg;
