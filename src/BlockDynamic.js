import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ZoomableImage from 'react-zoomable-image';
import Dimensions from 'react-dimensions';


const computeDimensions = (imageDimensions, containerDimensions) => {
  const dimensions = {
    width: 0,
    height: 0
  };
  // proportion relatively to height
  if (imageDimensions.width > imageDimensions.height) {
    dimensions.width = containerDimensions.width;
    dimensions.height = (containerDimensions.width * imageDimensions.height) / imageDimensions.width;
  // proportion relatively to width
  } else {
    dimensions.height = containerDimensions.height;
    dimensions.width = (containerDimensions.height * imageDimensions.width) / imageDimensions.height;
  }
  return {
    dimensions,
    ratio:  (imageDimensions.width * imageDimensions.height) / (containerDimensions.width * containerDimensions.height)
  };
}

const Zoomable = Dimensions()(({
  src,
  title,
  imageDimensions,
  containerWidth,
  containerHeight
}) => {
  const {dimensions, ratio} = computeDimensions(imageDimensions, {
      width: containerWidth,
      height: containerHeight
    });
  if (imageDimensions.width * imageDimensions.height > containerWidth * containerHeight) {
    return (
      <ZoomableImage
          baseImage={{
            alt: title,
            src: src,
            width: dimensions.width,
            height: dimensions.height
          }}
          largeImage={{
            alt: title,
            src,
            width: dimensions.width * ratio,
            height: dimensions.height * ratio
          }}
          thumbnailImage={{
            alt: title,
            src
          }}
        />
    );
  } else {
    return (
      <img 
        src={src} 
        alt={title}
        style={{
          width: dimensions.width,
          height: dimensions.height
        }}
      />
    )
  }
})

class BlockDynamic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }
  }

  componentWillMount() {
    this.updateImageDimensions(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.resource !== nextProps.resource) {
      this.updateImageDimensions(nextProps);
    }
  }

  toggleModal = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  updateImageDimensions = (props) => {
    const {
      context: {
        datasets
      }
    } = this;

    const {
      resource
    } = props;

    if (datasets && resource && resource.data) {
      const dataset = datasets[resource.data.imageDataset];
      if (!dataset) {
        return;
      }
      var img = new Image();

      img.onload = () => {
        var imageHeight = img.height;
        var imageWidth = img.width;

        this.setState({
          imageHeight,
          imageWidth
        })
      }

      img.src = dataset.uri;
    }
  }

  render() {
    const {
      props: {
        resource
      }, 
      state: {
        modalIsOpen,
        imageHeight,
        imageWidth,
      },
      context: {
        datasets = {}
      },
      toggleModal
    } = this;


    const dataset = datasets[resource.data.imageDataset];
    return dataset ? (
      <figure
          className="peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image"
      >
        <img 
          src={dataset.uri} 
          onClick={toggleModal}
        />
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={toggleModal}
          style={{
            content: {
              background: 'rgba(0,0,0,0)',
              border: 'none'
            }
          }}
        >
          <Zoomable 
            src={dataset.uri} 
            title={resource.metadata.title} 
            imageDimensions={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
          {/*<img 
            src={dataset.uri} 
          />*/}
        </Modal>
      </figure>
    ) : null;

  }
}

BlockDynamic.contextTypes = {
  datasets: PropTypes.object,
}

export default BlockDynamic;