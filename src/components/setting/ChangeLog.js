import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { CloseSVG } from "../Icons";

const ChangeLog = ({ close }) => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    setVersion(process.env.REACT_APP_VERSION);
  }, []);

  return (
    <div className="changelog-container">
      <header>
        <h2>Últimos Cambios - v{version}</h2>
        <button className="close-btn" onClick={close}>
          <CloseSVG />
        </button>
      </header>
      <section>
        <h3>Mejoras Visuales</h3>
        <ul>
          <li>Mejoras visuales para una mejor experiencia de usuario.</li>
        </ul>
        <h3>Bugs Arreglados</h3>
        <ul>
          <li>Error al primer intento de logeo despues del registro.</li>
        </ul>
      </section>
    </div>
  );
};

export default ChangeLog;

ChangeLog.propTypes = {
  close: PropTypes.func.isRequired
};
