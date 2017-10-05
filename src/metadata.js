export default {
  type: 'peritext-contextualizer',
  id: 'image',
  name: 'Image display',
  coverage: {
    inlineStatic: false,
    blockStatic: true,
    inlineDynamic: false,
    blockDynamic: true,
  },
  model: {
    acceptedResourceTypes: [{type: 'image'}],
    block: {
      expandable: false,
      options: []
    }
  }
}