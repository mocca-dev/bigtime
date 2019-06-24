import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { LoadingSVG } from "./Icons";

const AudioUpload = React.forwardRef(({ labelTxt, showLoading }, ref) => (
  <Fragment>
    <input
      className="input-audio"
      type="file"
      ref={ref}
      name="audio-file"
      id="audio-file"
      accpet="audio/*"
    />
    <label className="upload-label" htmlFor="audio-file">
      {labelTxt ? labelTxt : "Seleccionar tema..."}
      {showLoading && <LoadingSVG />}
    </label>
  </Fragment>
));

AudioUpload.propTypes = {
  labelTxt: PropTypes.string
};

export default AudioUpload;
