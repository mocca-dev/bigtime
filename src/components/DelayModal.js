import React from "react";
import { CheckSVG } from "./Icons";

const DelayModal = ({ setDelay, delay, setShowDelayModal }) => {
  return (
    <div className="modal-container">
      <h4>Delay de inicio</h4>
      <span>{delay}</span>
      <div className="bottom-bar">
        <button
          onClick={() => {
            delay > 0 && setDelay(delay - 1);
          }}
        >
          <CheckSVG />
        </button>
        <button onClick={() => delay < 15 && setDelay(delay + 1)}>
          <CheckSVG />
        </button>
      </div>
      <div className="bottom-bar">
        <button
          onClick={() => {
            setDelay(0);
            setShowDelayModal(false);
          }}
        >
          <CheckSVG />
        </button>
        <button onClick={() => setShowDelayModal(false)}>
          <CheckSVG />
        </button>
      </div>
    </div>
  );
};

export default DelayModal;
