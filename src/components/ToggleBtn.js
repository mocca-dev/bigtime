import React from "react";

const ToggleBtn = ({
  toggle,
  value,
  cClass,
  srcValueT,
  srcValueF,
  disabled
}) => {
  return (
    <button className={cClass} onClick={() => toggle()} disabled={disabled}>
      {value ? (
        <img className="icon" src={srcValueT} alt="" />
      ) : (
        <img className="icon" src={srcValueF} alt="" />
      )}
    </button>
  );
};

export default ToggleBtn;
