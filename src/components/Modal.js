import React from "react";
import PropTypes from "prop-types";

import { CheckSVG, CloseSVG } from "./Icons";

const Modal = ({ hideModal, okAction, cancelAction, title, bodyTxt }) => (
  <div className="modal-container">
    <h3>{title}</h3>
    <span>{bodyTxt}</span>
    <div className="bottom-bar">
      <button
        onClick={() => {
          cancelAction().then(() => hideModal());
        }}
      >
        <CloseSVG />
      </button>
      <button
        onClick={() => {
          okAction().then(hasHide => hasHide && hideModal());
        }}
      >
        <CheckSVG />
      </button>
    </div>
  </div>
);

export default Modal;

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  okAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bodyTxt: PropTypes.string.isRequired
};
