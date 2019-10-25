"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactImages = _interopRequireDefault(require("react-images"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
const inBrowser = isBrowser();

class Inline extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "setCurrentImage", currentImage => {
      this.setState({
        currentImage
      });
    });

    _defineProperty(this, "nextImage", () => {
      const {
        currentImage
      } = this.state;
      const newImage = currentImage + 1 > this.props.resource.data.length - 1 ? 0 : currentImage + 1;
      this.setState({
        currentImage: newImage
      });
    });

    _defineProperty(this, "previousImage", () => {
      const {
        currentImage
      } = this.state;
      const newImage = currentImage - 1 < 0 ? this.props.resource.data.length - 1 : currentImage - 1;
      this.setState({
        currentImage: newImage
      });
    });

    _defineProperty(this, "onOpenLightBox", () => {
      this.setState({
        currentImage: 0,
        lightBoxOpen: true
      });
    });

    _defineProperty(this, "onCloseLightBox", () => {
      this.setState({
        lightBoxOpen: false
      });
    });

    this.state = {
      currentImage: 0,
      lightBoxOpen: false
    };
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
      setCurrentImage
    } = this;
    let images = resource.data && resource.data.images && resource.data.images.map(image => getAppropriateAssetUri(image)).map((src, imageIndex) => ({
      src,
      caption: resource.data.images[imageIndex].caption,
      alt: resource.data.images[imageIndex].caption
    })).filter(i => i.src);

    if (parameters.showOnlyFirstImage && images.length) {
      images = [images[0]];
    }

    return [_react.default.createElement("span", {
      key: 1,
      className: "inline-images-container"
    }, images.map((image, index) => {
      const handleClick = () => {
        setCurrentImage(index);
        onOpenLightBox();
      };

      return _react.default.createElement("img", {
        key: index,
        src: images[index].src,
        onClick: handleClick
      });
    })), inBrowser ? _react.default.createElement(_reactImages.default, {
      key: 2,
      images: images,
      isOpen: lightBoxOpen,
      currentImage: currentImage,
      onClickPrev: previousImage,
      onClickNext: nextImage,
      onClose: onCloseLightBox,
      showImageCount: false,
      rightArrowTitle: '→',
      backdropClosesModal: true
    }) : null];
  }

}

var _default = Inline;
exports.default = _default;