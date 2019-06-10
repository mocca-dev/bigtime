import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { RefreshSVG, CloseSVG } from "./Icons";

const Toaster = ({ content, close, ok }) => (
  <Fragment>
    <div className="overlay" />
    <div className="toaster-container">
      <div>{content}</div>
      <div className="toaster-btns">
        <button onClick={() => ok()}>
          <RefreshSVG />
        </button>
        <button onClick={() => close()}>
          <CloseSVG />
        </button>
      </div>
    </div>
  </Fragment>
);

Toaster.propTypes = {
  content: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  ok: PropTypes.func.isRequired
};

export default Toaster;
