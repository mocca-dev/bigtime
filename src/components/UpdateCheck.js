import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Toaster from "./Toaster";

const UpdateCheck = ({ sWPromise, setUpdate }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    sWPromise.then(res => {
      setText(res.text);
      setShow(true);
    });
  }, []);

  return (
    <Fragment>
      {show && (
        <Toaster
          content={text}
          close={() => setShow(false)}
          ok={() => window.location.reload()}
          cClass="update-check"
        />
      )}
    </Fragment>
  );
};

export default UpdateCheck;

UpdateCheck.propTypes = {
  sWPromise: PropTypes.object.isRequired,
  setUpdate: PropTypes.func.isRequired
};
