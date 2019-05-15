import React from "react";
import PropTypes from "prop-types";

const Toaster = ({ content, close, ok }) => (
  <div className="toaster-container">
    <div>{content}</div>
    <div className="toaster-btns">
      <button onClick={() => ok()}>actualizar</button>
      <button onClick={() => close()}>cerrar</button>
    </div>
  </div>
);

Toaster.propTypes = {
  content: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  ok: PropTypes.func.isRequired
};

export default Toaster;
