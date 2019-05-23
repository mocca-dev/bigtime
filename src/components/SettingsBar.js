import React from "react";

import { RepeatSVG, RepeatSVGDisabled, RefreshSVG } from "./Icons";
import ToggleTheme from "./ToggleTheme";
import ToggleBtn from "./ToggleBtn";

const SettingsBar = ({ data, actions }) => {
  const { theme, bucle, update } = data;
  const { setTheme, toggleBucle, showDelayModal } = actions;
  const refreshClass = "btn btn-theme btn-refresh ";

  return (
    <div className="settings-bar">
      <ToggleTheme theme={theme} setTheme={() => setTheme()} />
      <ToggleBtn
        cClass="btn btn-theme"
        IconT={RepeatSVG}
        IconF={RepeatSVGDisabled}
        value={bucle}
        toggle={() => {
          toggleBucle();
        }}
        disabled={false}
      />
      <ToggleBtn
        cClass={update ? refreshClass + "update" : refreshClass}
        IconT={RefreshSVG}
        IconF={RefreshSVG}
        value={true}
        toggle={() => {
          window.location.reload();
        }}
      />
      {/* <ToggleBtn
        cClass="btn btn-theme"
        IconT={RepeatSVG}
        IconF={RepeatSVG}
        value={bucle}
        toggle={() => {
          showDelayModal();
        }}
      /> */}
    </div>
  );
};

export default SettingsBar;
