import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { CheckSVG, CloseSVG } from "./Icons";

const Modal = ({ hideModal, okAction, cancelAction, title, bodyTxt }) => (
  <Fragment>
    <div className="overlay" />
    <div className="modal-container">
      <h3>{title}</h3>
      <span>{bodyTxt}</span>
      <div className="bottom-bar">
        {cancelAction && (
          <button
            onClick={() => {
              cancelAction().then(() => hideModal());
            }}
          >
            <CloseSVG />
          </button>
        )}
        {okAction && (
          <button
            onClick={() => {
              okAction().then(hasHide => hasHide && hideModal());
            }}
          >
            <CheckSVG />
          </button>
        )}
      </div>
    </div>
  </Fragment>
);

export default Modal;

Modal.propTypes = {
  hideModal: PropTypes.func,
  okAction: PropTypes.func,
  cancelAction: PropTypes.func,
  title: PropTypes.string.isRequired,
  bodyTxt: PropTypes.string.isRequired
};
