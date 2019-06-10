import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Toaster from "./Toaster";

const UpdateCheck = ({ appServiceWorker, setUpdate }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    appServiceWorker.onUpdateFound(() => {
      setShow(true);
      // setUpdate(true);
    });
  });

  return (
    <Fragment>
      {show && (
        <Toaster
          content="Nueva actualizacion!"
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
  appServiceWorker: PropTypes.object.isRequired,
  setUpdate: PropTypes.func.isRequired
};
