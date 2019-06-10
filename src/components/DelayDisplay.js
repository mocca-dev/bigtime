import React from "react";
import PropTypes from "prop-types";

const DelayDisplay = ({ delay }) => (
  <div className="delay-display">{delay}</div>
);

export default DelayDisplay;

DelayDisplay.propTypes = {
  delay: PropTypes.string.isRequired
};
