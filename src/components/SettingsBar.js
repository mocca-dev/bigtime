import React from "react";

import { RepeatSVG, RepeatSVGDisabled } from "./Icons";
import ToggleTheme from "./ToggleTheme";
import ToggleBtn from "./ToggleBtn";

const SettingsBar = ({ data, actions }) => {
  const { theme, bucle } = data;
  const { setTheme, toggleBucle, showDelayModal } = actions;

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
      />
      <ToggleBtn
        cClass="btn btn-theme"
        IconT={RepeatSVG}
        IconF={RepeatSVG}
        value={bucle}
        toggle={() => {
          showDelayModal();
        }}
      />
    </div>
  );
};

export default SettingsBar;
