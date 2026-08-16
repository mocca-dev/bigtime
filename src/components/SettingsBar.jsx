import PropTypes from "prop-types";
import { RepeatSVG, RepeatSVGDisabled } from "./Icons";
import ToggleTheme from "./ToggleTheme";
import ToggleBtn from "./ToggleBtn";

const SettingsBar = ({ bucle, toggleBucle }) => (
  <div className="settings-bar">
    <ToggleTheme />
    <ToggleBtn
      cClass="btn btn-theme"
      IconT={RepeatSVG}
      IconF={RepeatSVGDisabled}
      value={bucle}
      toggle={() => toggleBucle()}
      disabled={false}
    />
  </div>
);

SettingsBar.propTypes = {
  bucle: PropTypes.bool.isRequired,
  toggleBucle: PropTypes.func.isRequired
};

export default SettingsBar;
