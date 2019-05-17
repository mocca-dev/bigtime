import React from "react";

import { RepeatSVG, RepeatSVGDisabled } from "./Icons";
import ToggleTheme from "./ToggleTheme";
import ToggleBtn from "./ToggleBtn";

const SettingsBar = ({ data, actions }) => {
  const { theme, bucle } = data;
  const { setTheme, toggleBucle } = actions;

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
          console.log("repeat");
        }}
        disabled={false}
      />
    </div>
  );
};

export default SettingsBar;
