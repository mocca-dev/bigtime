import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Component that alerts if you click outside of it
 */
const OutsideClick = ({ children, action }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef && !wrapperRef.current.contains(event.target) && action) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClick;

OutsideClick.propTypes = {
  children: PropTypes.element.isRequired
};
