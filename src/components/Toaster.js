import React from "react";

const Toaster = ({ content, close, refresh }) => (
  <div className="toaster-container">
    <div>{content}</div>
    <div className="toaster-btns">
      <button onClick={() => refresh()}>actualizar</button>
      <button onClick={() => close()}>cerrar</button>
    </div>
  </div>
);

export default Toaster;
