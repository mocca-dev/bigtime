import React, { useState, useEffect, Fragment } from "react";
import Toaster from "./Toaster";

const UpdateCheck = ({ appServiceWorker }) => {
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    appServiceWorker.onUpdateFound(() => {
      setShow(true);
      setUpdated(true);
    });
  }, [updated]);

  return (
    <Fragment>
      {show && (
        <Toaster
          content="Nueva actualizacion!"
          close={() => setShow(false)}
          ok={() => window.location.reload()}
        />
      )}
    </Fragment>
  );
};

export default UpdateCheck;
