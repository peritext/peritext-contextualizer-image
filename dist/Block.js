"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _meta = _interopRequireDefault(require("./meta"));

var _peritextUtils = require("peritext-utils");

var _DynamicImagesBlock = _interopRequireDefault(require("./DynamicImagesBlock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Block = ({
  resource,
  renderingMode = 'screened',
  assets = {}
  /*
   * contextualizer,
   * contextualization,
   */

}, {}) => {
  switch (renderingMode) {
    case 'screened':
      const getAppropriateAssetUri = img => {
        const appropriateAsset = (0, _peritextUtils.chooseAppropriateSubAsset)(img, _meta.default.profile.block.assetPickingRules.image[renderingMode], assets);

        if (appropriateAsset) {
          return appropriateAsset.asset.data;
        }
      };

      return _react.default.createElement(_DynamicImagesBlock.default, {
        getAppropriateAssetUri: getAppropriateAssetUri,
        resource: resource
      });

    default:
      return _react.default.createElement("div", {
        className: 'static-images-container block'
      }, resource.data.images.map((img, index) => {
        const appropriateAsset = (0, _peritextUtils.chooseAppropriateSubAsset)(img, _meta.default.profile.block.assetPickingRules.image[renderingMode], assets);

        if (appropriateAsset) {
          const imageAssetUri = appropriateAsset.asset.data;
          return _react.default.createElement("div", {
            key: index,
            className: 'specific-image-container'
          }, _react.default.createElement("img", {
            src: imageAssetUri
          }), img.caption && _react.default.createElement("figcaption", {
            className: 'image-specific-caption'
          }, img.caption));
        }

        return null;
      }));
  }
};

Block.contextTypes = {
  productionAssets: _propTypes.default.object
};
var _default = Block;
exports.default = _default;