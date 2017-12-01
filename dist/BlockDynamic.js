'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockDynamic = function BlockDynamic(_ref, _ref2) {
  var resource = _ref.resource;
  var _ref2$datasets = _ref2.datasets,
      datasets = _ref2$datasets === undefined ? {} : _ref2$datasets;

  var dataset = datasets[resource.data.imageDataset];
  return dataset ? _react2.default.createElement(
    'figure',
    {
      className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image'
    },
    _react2.default.createElement('img', {
      src: dataset.uri
    })
  ) : null;
};

BlockDynamic.contextTypes = {
  datasets: _propTypes2.default.object
};

exports.default = BlockDynamic;