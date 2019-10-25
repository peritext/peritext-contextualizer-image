/* eslint react/no-set-state : 0 */
/* eslint  no-new-func : 0 */
import React, { Component } from 'react';
import Lightbox from 'react-images';

const isBrowser = new Function( 'try {return this===window;}catch(e){ return false;}' );
const inBrowser = isBrowser();

class Inline extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      currentImage: 0,
      lightBoxOpen: false
    };
  }

  setCurrentImage = ( currentImage ) => {
    this.setState( {
      currentImage
    } );
  }

  nextImage = () => {
    const { currentImage } = this.state;
    const newImage = currentImage + 1 > this.props.resource.data.length - 1 ? 0 : currentImage + 1;
    this.setState( {
      currentImage: newImage
    } );
  }

  previousImage = () => {
    const { currentImage } = this.state;
    const newImage = currentImage - 1 < 0 ? this.props.resource.data.length - 1 : currentImage - 1;
    this.setState( {
      currentImage: newImage
    } );
  }

  onOpenLightBox = () => {
    this.setState( {
      currentImage: 0,
      lightBoxOpen: true
    } );
  }

  onCloseLightBox = () => {
    this.setState( {
      lightBoxOpen: false
    } );
  }

  render() {
    const {
      props: {
        resource,
        getAppropriateAssetUri,
        contextualizer: {
          parameters = {}
        }
      },
      state: {
        currentImage = 0,
        lightBoxOpen
      },
      nextImage,
      previousImage,
      onOpenLightBox,
      onCloseLightBox,
      setCurrentImage,
    } = this;

    let images = resource.data
                  && resource.data.images
                  && resource.data.images
                  .map( ( image ) => getAppropriateAssetUri( image ) )
                  .map( ( src, imageIndex ) => ( {
                    src,
                    caption: resource.data.images[imageIndex].caption,
                    alt: resource.data.images[imageIndex].caption
                  } ) )
                  .filter( ( i ) => i.src );
    if (parameters.showOnlyFirstImage && images.length) {
      images = [images[0]]
    }

    return [
      <span key={1} className="inline-images-container">
        {images.map((image, index) => {
            const handleClick = () => {
              setCurrentImage( index )
              onOpenLightBox();
            }
            return (
              <img
                key={index}
                src={ images[index].src }
                onClick={ handleClick }
              />
            )
          })
        }
      </span>,
      inBrowser ?
        <Lightbox
          key={2}
          images={ images }
          isOpen={ lightBoxOpen }
          currentImage={ currentImage }
          onClickPrev={ previousImage }
          onClickNext={ nextImage }
          onClose={ onCloseLightBox }
          showImageCount={ false }
          rightArrowTitle={ '→' }
          backdropClosesModal
        /> 
      : null
    ];
  }
}

export default Inline;
