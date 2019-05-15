import React from "react";

const ToggleBtn = ({ toggle, value, cClass, IconT, IconF, disabled }) => {
  return (
    <button className={cClass} onClick={() => toggle()} disabled={disabled}>
      {value ? <IconT /> : <IconF />}
    </button>
  );
};

export default ToggleBtn;
