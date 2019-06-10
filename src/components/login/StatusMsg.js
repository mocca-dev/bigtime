import React from "react";
import PropTypes from "prop-types";

const StatusMsg = ({ color, content }) => {
  return <div className={"status-msg-container " + color}>{content}</div>;
};

export default StatusMsg;

StatusMsg.propTypes = {
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
