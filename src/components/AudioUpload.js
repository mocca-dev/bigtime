import React, { Fragment } from "react";
import PropTypes from "prop-types";

const AudioUpload = React.forwardRef(({ labelTxt }, ref) => (
  <Fragment>
    <input
      className="input-audio"
      type="file"
      ref={ref}
      name="audio-file"
      id="audio-file"
      accpet="audio/*"
    />
    <label htmlFor="audio-file">
      {labelTxt ? labelTxt : "Seleccionar tema..."}
    </label>
  </Fragment>
));

AudioUpload.propTypes = {
  labelTxt: PropTypes.string
};

export default AudioUpload;
