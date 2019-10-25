"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _meta = _interopRequireDefault(require("./meta"));

var _peritextUtils = require("peritext-utils");

var _DynamicImagesInline = _interopRequireDefault(require("./DynamicImagesInline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Inline = ({
  resource,
  renderingMode = 'screened',
  assets = {},
  children,
  contextualizer = {}
  /*
   * contextualization,
   */

}, {}) => {
  const {
    parameters = {}
  } = contextualizer;
  const {
    showOnlyFirstImage = false
  } = parameters;

  switch (renderingMode) {
    case 'screened':
      const getAppropriateAssetUri = img => {
        const appropriateAsset = (0, _peritextUtils.chooseAppropriateSubAsset)(img, _meta.default.profile.inline.assetPickingRules.image[renderingMode], assets);

        if (appropriateAsset) {
          return appropriateAsset.asset.data;
        }
      };

      return _react.default.createElement(_DynamicImagesInline.default, {
        getAppropriateAssetUri: getAppropriateAssetUri,
        resource: resource,
        contextualizer: contextualizer
      });

    default:
      return _react.default.createElement("span", {
        className: 'static-images-container inline'
      }, (showOnlyFirstImage && resource.data.images.length ? [resource.data.images[0]] : resource.data.images).map((img, index) => {
        const appropriateAsset = (0, _peritextUtils.chooseAppropriateSubAsset)(img, _meta.default.profile.inline.assetPickingRules.image[renderingMode], assets);

        if (appropriateAsset) {
          const imageAssetUri = appropriateAsset.asset.data;
          return _react.default.createElement("span", {
            key: index,
            className: 'specific-image-container inline-images-container'
          }, _react.default.createElement("img", {
            src: imageAssetUri
          }), children);
        }

        return null;
      }));
  }
};

Inline.contextTypes = {
  productionAssets: _propTypes.default.object
};
var _default = Inline;
exports.default = _default;