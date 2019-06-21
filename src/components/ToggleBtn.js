import React from "react";
import PropTypes from "prop-types";
import ReactNoSleep from "react-no-sleep";

const ToggleBtn = ({ toggle, value, cClass, IconT, IconF, disabled }) => {
  const enableT = enable => {
    enable();
    toggle();
  };
  const disableT = disable => {
    disable();
    toggle();
  };

  return (
    <ReactNoSleep>
      {({ isOn, enable, disable }) => (
        <button
          className={cClass}
          onClick={() => (isOn ? disableT(disable) : enableT(enable))}
          disabled={disabled}
        >
          {value ? <IconT /> : <IconF />}
        </button>
      )}
    </ReactNoSleep>
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
