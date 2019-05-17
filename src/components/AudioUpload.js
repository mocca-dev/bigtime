import React from "react";
import PropTypes from "prop-types";

const AudioUpload = React.forwardRef(({ labelTxt }, ref) => (
  <React.Fragment>
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
  </React.Fragment>
));

AudioUpload.propTypes = {
  labelTxt: PropTypes.string
};

export default AudioUpload;
