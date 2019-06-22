import React from "react";
import PropTypes from "prop-types";

import { TwitterSVG, CloseSVG, MoonSVG, SunSVG } from "../Icons";
import SettingItem from "./SettingItem";
import OutsideClick from "./../OutsideClick";

const SettingsBar = ({ data, actions, setShowSettings }) => {
  const { theme, bucle } = data;
  const { setTheme, toggleBucle, signOut } = actions;

  const items = [
    {
      title: "Tema",
      detail: "Puede activar el modo oscuro o el modo claro",
      action: setTheme,
      value: theme,
      checkedIcon: SunSVG,
      uncheckedIcon: MoonSVG
    },
    {
      title: "Bucle",
      detail: "Al finalizar la pista volverá a reproducirse",
      action: toggleBucle,
      value: bucle
    },
    {
      title: "Reiniciar",
      detail: "En caso de necesitarlo puede reiniciar la aplicación",
      action: () => window.location.reload(),
      value: false
    }
  ];

  return (
    <div className="setting-bar-container">
      <div className="overlay" />
      <OutsideClick action={() => setShowSettings(false)}>
        <div className="settings-bar">
          <header>
            <h2>Ajustes</h2>
            <button
              className="close-btn"
              onClick={() => setShowSettings(false)}
            >
              <CloseSVG />
            </button>
          </header>
          <div className="items-container">
            {items.map((item, i) => (
              <SettingItem item={item} key={i} />
            ))}
          </div>
          <div className="bottom-bar">
            <button>
              <TwitterSVG /> Contacto
            </button>
            <button onClick={signOut}>Cerrar Sesión</button>
          </div>
        </div>
      </OutsideClick>
    </div>
  );
};

export default SettingsBar;

SettingsBar.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  setShowSettings: PropTypes.func.isRequired
};
