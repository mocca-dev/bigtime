import React from "react";
import { SettingsSVG } from "./Icons";

const SettingsBtn = ({ onClick }) => {
  return (
    <button className="btn btn-settings" onClick={() => onClick()}>
      <SettingsSVG />
    </button>
  );
};

export default SettingsBtn;
