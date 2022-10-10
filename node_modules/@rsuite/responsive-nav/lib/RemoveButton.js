"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));

var RemoveButton = function RemoveButton(props) {
  var eventKey = props.eventKey,
      activeKey = props.activeKey,
      onItemRemove = props.onItemRemove,
      children = props.children;

  var handleRemove = function handleRemove(event) {
    event.stopPropagation();
    event.preventDefault();
    onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(eventKey);
  };

  var iconStyle = {
    fontSize: 12,
    marginLeft: 4,
    width: 12
  };

  if (activeKey === eventKey) {
    iconStyle.color = '#f44336';
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children, " ", /*#__PURE__*/_react.default.createElement(_Close.default, {
    onClick: handleRemove,
    style: iconStyle
  }));
};

var _default = RemoveButton;
exports.default = _default;