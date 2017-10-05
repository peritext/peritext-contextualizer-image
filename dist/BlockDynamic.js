"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var resource = _ref.resource;

  // future-proofing possible externally linked images
  var src = resource.data.base64 || resource.data.src || resource.data.url;
  return _react2.default.createElement(
    "figure",
    {
      className: "peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image"
    },
    _react2.default.createElement("img", {
      src: src
    })
  );
};