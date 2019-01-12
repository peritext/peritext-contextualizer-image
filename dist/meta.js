"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  id: 'image',
  type: 'peritext-contextualizer',
  name: 'Image(s) contextualizer',
  acceptedResourceTypes: [{
    type: 'image'
  }],
  profile: {
    block: {
      mutable: false,
      assetPickingRules: {
        image: {
          screened: ['rgbImageAssetId', 'cmybImageAssetId'],
          paged: ['cmybImageAssetId', 'rgbImageAssetId']
        }
      }
    }
  }
};
exports.default = _default;