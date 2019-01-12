import React from 'react';
import PropTypes from 'prop-types';

import meta from './meta';
import { chooseAppropriateSubAsset } from 'peritext-utils';
import DynamicBlock from './DynamicImagesBlock';

const Block = ( {
  resource,

  renderingMode = 'screened',

  assets = {},

  /*
   * contextualizer,
   * contextualization,
   */
}, {
 } ) => {

  switch ( renderingMode ) {
    case 'screened':
      const getAppropriateAssetUri = ( img ) => {
        const appropriateAsset = chooseAppropriateSubAsset( img, meta.profile.block.assetPickingRules.image[renderingMode], assets );
        if ( appropriateAsset ) {
          return appropriateAsset.asset.data;
        }
      };
      return (
        <DynamicBlock
          getAppropriateAssetUri={ getAppropriateAssetUri }
          resource={ resource }
        />
      );
    default:
      return (
        <div className={ 'static-images-container' }>
          {
            resource.data.images.map( ( img, index ) => {
              const appropriateAsset = chooseAppropriateSubAsset( img, meta.profile.block.assetPickingRules.image[renderingMode], assets );
              if ( appropriateAsset ) {
                const imageAssetUri = appropriateAsset.asset.data;
                return (
                  <div
                    key={ index }
                    className={ 'specific-image-container' }
                  >
                    <img
                      src={ imageAssetUri }

                    />
                    {
                      img.caption &&
                      <figcaption className={ 'image-specific-caption' }>
                        {img.caption}
                      </figcaption>
                    }
                  </div>
                );
              }
              return null;
            } )
          }
        </div>
      );
  }
};

Block.contextTypes = {
  productionAssets: PropTypes.object,
};

export default Block;
