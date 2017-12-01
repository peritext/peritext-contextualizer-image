import React from 'react';
import PropTypes from 'prop-types';

const BlockStatic = ({
  resource
}, {
  datasets = {}
}) => {
  const dataset = datasets[resource.data.imageDataset];
  return dataset ? (
    <figure 
      className="peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualizer-image"
    >
      <img 
        src={dataset.uri} 
      />
    </figure>
  ) : null;
}

BlockStatic.contextTypes = {
  datasets: PropTypes.object,
}

export default BlockStatic;