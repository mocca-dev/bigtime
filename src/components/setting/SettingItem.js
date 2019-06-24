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
      {item.buttonDetails && item.buttonDetails.toggle ? (
        <Switch
          onChange={() => item.action()}
          checked={item.value}
          onColor="#2693e6"
          uncheckedIcon={
            item.buttonDetails.uncheckedIcon ? (
              <item.buttonDetails.uncheckedIcon />
            ) : (
              false
            )
          }
          checkedIcon={
            item.buttonDetails.checkedIcon ? (
              <item.buttonDetails.checkedIcon />
            ) : (
              false
            )
          }
        />
      ) : (
        <button className="btn btn-default" onClick={() => item.action()}>
          <item.buttonDetails.checkedIcon />
        </button>
      )}
    </div>
  );
};

export default SettingItem;

SettingItem.propTypes = {
  item: PropTypes.object
};
