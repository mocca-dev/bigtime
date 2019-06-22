import React from "react";
import PropTypes from "prop-types";

const ToggleBtn = ({ toggle, value, cClass, IconT, IconF, disabled }) => {
  return (
    <button className={cClass} onClick={toggle} disabled={disabled}>
      {value ? <IconT /> : <IconF />}
    </button>
  );
};

export default ToggleBtn;

ToggleBtn.propTypes = {
  toggle: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  cClass: PropTypes.string.isRequired,
  IconT: PropTypes.func.isRequired,
  IconF: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
