import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import localforage from "localforage";

import Version from "../Version";

import {
  CloseSVG,
  MoonSVG,
  SunSVG,
  RefreshSVG,
  TrashSVG,
  HelpSVG
} from "../Icons";
import SettingItem from "./SettingItem";
import OutsideClick from "./../OutsideClick";
import ChangeLog from "./ChangeLog";
import Help from "../Help";

const SettingsBar = ({ data, actions, setShowSettings }) => {
  const { theme, bucle } = data;
  const { setTheme, toggleBucle, clearSong } = actions;

  const [showChangeLog, setShowChangeLog] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const items = [
    {
      title: "Modo Oscuro",
      detail: "Puede activar el modo oscuro o el modo claro",
      action: setTheme,
      value: theme,
      buttonDetails: {
        toggle: true,
        checkedIcon: SunSVG,
        uncheckedIcon: MoonSVG
      }
    },
    {
      title: "Bucle",
      detail: "Al finalizar la pista volverá a reproducirse",
      action: toggleBucle,
      value: bucle,
      buttonDetails: {
        toggle: true
      }
    },
    {
      title: "Reiniciar",
      detail: "En caso de necesitarlo puede reiniciar la aplicación",
      action: () => window.location.reload(),
      value: false,
      buttonDetails: {
        toggle: false,
        checkedIcon: RefreshSVG
      }
    },
    {
      title: "Limpiar Almacenaje",
      detail:
        "Al limpiar el almacenaje la última pista seleccionada deberá ser cargada nuevamente",
      action: () => {
        localforage.clear();
        clearSong();
      },
      value: false,
      buttonDetails: {
        toggle: false,
        checkedIcon: TrashSVG
      }
    }
  ];

  return (
    <Fragment>
      <div className="overlay" />
      <OutsideClick action={() => setShowSettings(false)}>
        <Fragment>
          {showChangeLog && <ChangeLog close={() => setShowChangeLog(false)} />}
          {showHelp && <Help close={() => setShowHelp(false)} />}
          <div className="settings-bar">
            <header>
              <span>
                <h2>Ajustes</h2>
                <Version onClick={() => setShowChangeLog(true)} />
              </span>
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
              <button onClick={() => setShowHelp(true)}>
                <HelpSVG /> <span>Ayuda</span>
              </button>
            </div>
          </div>
        </Fragment>
      </OutsideClick>
    </Fragment>
  );
};

export default SettingsBar;

SettingsBar.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  setShowSettings: PropTypes.func.isRequired
};
