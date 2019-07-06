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
        {/* <h3>Nuevas Funcionalidades</h3>
        <ul>
          <li>
            Ahora el último tema cargado se volverá a cargar cuando se abra la
            aplicación.
          </li>
        </ul>
        <h3>Bugs Arreglados</h3> */}
      </section>
    </div>
  );
};

export default ChangeLog;

ChangeLog.propTypes = {
  close: PropTypes.func.isRequired
};
