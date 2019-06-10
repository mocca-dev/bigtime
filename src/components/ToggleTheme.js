import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ToggleBtn from "./ToggleBtn";
import { MoonSVG, SunSVG } from "./Icons";

const ToggleTheme = ({ theme, setTheme }) => {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "light" : "dark"
    );
  });

  return (
    <ToggleBtn
      cClass="btn btn-theme"
      IconT={MoonSVG}
      IconF={SunSVG}
      value={theme}
      toggle={setTheme}
      disabled={false}
    />
  );
};

export default ToggleTheme;

ToggleTheme.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
};
