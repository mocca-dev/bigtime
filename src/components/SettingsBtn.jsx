import PropTypes from "prop-types";
import { SettingsSVG } from "./Icons";

const SettingsBtn = ({ onClick }) => {
  return (
    <button className="btn btn-settings" onClick={() => onClick()}>
      <SettingsSVG />
    </button>
  );
};

SettingsBtn.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SettingsBtn;
