import React, { useState, useEffect } from "react";
import ToggleBtn from "./ToggleBtn";
import { MoonSVG, SunSVG } from "./Icons";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "light" : "dark"
    );
  });

  const toggle = () => {
    setTheme(!theme);
  };

  return (
    <ToggleBtn
      cClass="btn btn-theme"
      IconT={MoonSVG}
      IconF={SunSVG}
      value={theme}
      toggle={toggle}
      disabled={false}
    />
  );
};

export default ToggleTheme;
