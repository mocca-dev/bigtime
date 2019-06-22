import React from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";

const SettingItem = ({ item }) => {
  return (
    <div className="item-container">
      <div>
        <div className="item-title">
          <strong>{item.title}</strong>
        </div>
        <div className="item-detail">{item.detail}</div>
      </div>
      <Switch
        onChange={() => item.action()}
        checked={item.value}
        onColor="#2693e6"
        uncheckedIcon={item.uncheckedIcon ? <item.uncheckedIcon /> : false}
        checkedIcon={item.checkedIcon ? <item.checkedIcon /> : false}
      />
    </div>
  );
};

export default SettingItem;

SettingItem.propTypes = {
  item: PropTypes.object
};
