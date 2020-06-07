import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import { chooseAppropriateSubAsset } from 'peritext-utils';
import DynamicInline from './DynamicImagesInline';

const Inline = ( {
  resource,

  renderingMode = 'screened',

  assets = {},

  children,
  contextualizer = {},
  contextualization,

  /*
   * contextualization,
   */
}, {
 } ) => {
   const {
     parameters = {}
   } = contextualizer;
   const {
     showOnlyFirstImage = false
   } = parameters;
  switch ( renderingMode ) {
    case 'screened':
      const getAppropriateAssetUri = ( img ) => {
        const appropriateAsset = chooseAppropriateSubAsset( img, meta.profile.inline.assetPickingRules.image[renderingMode], assets );
        if ( appropriateAsset ) {
          return appropriateAsset.asset.data;
        }
      };
      return (
        <DynamicInline
          getAppropriateAssetUri={ getAppropriateAssetUri }
          resource={ resource }
          contextualizer={contextualizer}
        />
      );
    default:
      return (
        <span className={ 'static-images-container inline' }>
          {
            (showOnlyFirstImage && resource.data.images.length ? [resource.data.images[0]] : resource.data.images)
            .map( ( img, index ) => {
              const appropriateAsset = chooseAppropriateSubAsset( img, meta.profile.inline.assetPickingRules.image[renderingMode], assets );
              if ( appropriateAsset ) {
                const imageAssetUri = appropriateAsset.asset.data;
                return (
                  <a
                    key={ index }
                    className={ 'specific-image-container inline-images-container' }
                    id={`figure-pointer-${contextualization.id}`}
                    href={`#end-figure-container-${contextualization.id}`}
                  >
                    <img
                      src={ imageAssetUri }
                    />
                    {children}
                  </a>
                );
              }
              return null;
            } )
          }
        </span>
      );
  }
};

Inline.contextTypes = {
  productionAssets: PropTypes.object,
};

export default Inline;
