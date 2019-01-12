
export default {
  id: 'image',
  type: 'peritext-contextualizer',
  name: 'Image(s) contextualizer',
  acceptedResourceTypes: [
  {
    type: 'image',
  }
  ],
  profile: {
    block: {
      mutable: false,
      assetPickingRules: {
        image: {
          screened: [ 'rgbImageAssetId', 'cmybImageAssetId' ],
          paged: [ 'cmybImageAssetId', 'rgbImageAssetId' ]
        }
      }
    }
  }
};
