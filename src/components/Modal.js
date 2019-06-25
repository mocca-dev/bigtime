import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { CheckSVG, CloseSVG, LoadingSVG, OKPaymentSVG } from "./Icons";
import OutsideClick from "./OutsideClick";

const Modal = ({
  hideModal,
  okAction,
  cancelAction,
  title,
  bodyTxt,
  status,
  preventOutside
}) => (
  <Fragment>
    <OutsideClick action={() => !preventOutside && hideModal()}>
      <div className="modal-container">
        <h3>{title}</h3>
        <span>{bodyTxt}</span>
        <div className="status-container">
          {status === "LOADING" && <LoadingSVG />}
          {status === "SUCCESS" && <OKPaymentSVG />}
        </div>
        {(cancelAction || okAction) && (
          <div className="bottom-bar">
            {cancelAction ? (
              <button
                onClick={() => {
                  cancelAction().then(hasHide => hasHide && hideModal());
                }}
              >
                <CloseSVG />
              </button>
            ) : (
              <div />
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
        )}
      </div>
    </OutsideClick>
    <div className="overlay" />
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
