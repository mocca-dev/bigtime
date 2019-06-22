import React from "react";
import PropTypes from "prop-types";
import { SettingsSVG } from "./../Icons";

const SettingsBtn = ({ onClick, update }) => {
  const classStr = "btn btn-settings ";

  return (
    <button
      className={update ? classStr + "update" : classStr}
      onClick={() => onClick()}
    >
      <SettingsSVG />
    </button>
  );
};

export default SettingsBtn;

SettingsBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  update: PropTypes.bool.isRequired
};
