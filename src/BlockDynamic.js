import React from 'react';

export default ({
  resource
}) => {
  // future-proofing possible externally linked images
  const src = resource.data.base64 || resource.data.src || resource.data.url;
  return (
  <figure
      className="peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image"
  >
    <img 
      src={src} 
    />
  </figure>
  );
}