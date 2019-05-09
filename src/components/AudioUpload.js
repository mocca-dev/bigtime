import React from "react";

const AudioUpload = ({ setRef, labelTxt }) => {
  return (
    <React.Fragment>
      <input
        className="input-audio"
        type="file"
        ref={ref => setRef(ref)}
        name="audio-file"
        id="audio-file"
        accpet="audio/*"
      />
      <label htmlFor="audio-file">
        {labelTxt ? labelTxt : "Seleccionar tema..."}
      </label>
    </React.Fragment>
  );
};

export default AudioUpload;
