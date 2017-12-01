import React from 'react';
import PropTypes from 'prop-types';

const BlockDynamic = ({
  resource
}, {
  datasets = {}
}) => {
  const dataset = datasets[resource.data.imageDataset];
  return dataset ? (
  <figure
      className="peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image"
  >
    <img 
      src={dataset.uri} 
    />
  </figure>
  ) : null;
};

BlockDynamic.contextTypes = {
  datasets: PropTypes.object,
}

export default BlockDynamic;