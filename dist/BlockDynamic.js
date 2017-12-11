'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactZoomableImage = require('react-zoomable-image');

var _reactZoomableImage2 = _interopRequireDefault(_reactZoomableImage);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var computeDimensions = function computeDimensions(imageDimensions, containerDimensions) {
  var dimensions = {
    width: 0,
    height: 0
  };
  // proportion relatively to height
  if (imageDimensions.width > imageDimensions.height) {
    dimensions.width = containerDimensions.width;
    dimensions.height = containerDimensions.width * imageDimensions.height / imageDimensions.width;
    // proportion relatively to width
  } else {
    dimensions.height = containerDimensions.height;
    dimensions.width = containerDimensions.height * imageDimensions.width / imageDimensions.height;
  }
  return {
    dimensions: dimensions,
    ratio: imageDimensions.width * imageDimensions.height / (containerDimensions.width * containerDimensions.height)
  };
};

var Zoomable = (0, _reactDimensions2.default)()(function (_ref) {
  var src = _ref.src,
      title = _ref.title,
      imageDimensions = _ref.imageDimensions,
      containerWidth = _ref.containerWidth,
      containerHeight = _ref.containerHeight;

  var _computeDimensions = computeDimensions(imageDimensions, {
    width: containerWidth,
    height: containerHeight
  }),
      dimensions = _computeDimensions.dimensions,
      ratio = _computeDimensions.ratio;

  if (imageDimensions.width * imageDimensions.height > containerWidth * containerHeight) {
    return _react2.default.createElement(_reactZoomableImage2.default, {
      baseImage: {
        alt: title,
        src: src,
        width: dimensions.width,
        height: dimensions.height
      },
      largeImage: {
        alt: title,
        src: src,
        width: dimensions.width * ratio,
        height: dimensions.height * ratio
      },
      thumbnailImage: {
        alt: title,
        src: src
      }
    });
  } else {
    return _react2.default.createElement('img', {
      src: src,
      alt: title,
      style: {
        width: dimensions.width,
        height: dimensions.height
      }
    });
  }
});

var BlockDynamic = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(BlockDynamic, _Component);

  function BlockDynamic(props) {
    (0, _classCallCheck3.default)(this, BlockDynamic);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BlockDynamic.__proto__ || (0, _getPrototypeOf2.default)(BlockDynamic)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      modalIsOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(BlockDynamic, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateImageDimensions(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.resource !== nextProps.resource) {
        this.updateImageDimensions(nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var resource = this.props.resource,
          _state = this.state,
          modalIsOpen = _state.modalIsOpen,
          imageHeight = _state.imageHeight,
          imageWidth = _state.imageWidth,
          _context$datasets = this.context.datasets,
          datasets = _context$datasets === undefined ? {} : _context$datasets,
          toggleModal = this.toggleModal;


      var dataset = datasets[resource.data.imageDataset];
      return dataset ? _react2.default.createElement(
        'figure',
        {
          className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-web peritext-contextualizer-image'
        },
        _react2.default.createElement('img', {
          src: dataset.uri,
          onClick: toggleModal
        }),
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: modalIsOpen,
            ariaHideApp: false,
            onRequestClose: toggleModal,
            style: {
              content: {
                background: 'rgba(0,0,0,0)',
                border: 'none'
              }
            }
          },
          _react2.default.createElement(Zoomable, {
            src: dataset.uri,
            title: resource.metadata.title,
            imageDimensions: {
              width: imageWidth,
              height: imageHeight
            }
          })
        )
      ) : null;
    }
  }]);
  return BlockDynamic;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.toggleModal = function (e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    _this2.setState({
      modalIsOpen: !_this2.state.modalIsOpen
    });
  };

  this.updateImageDimensions = function (props) {
    var datasets = _this2.context.datasets;
    var resource = props.resource;


    if (datasets && resource && resource.data) {
      var dataset = datasets[resource.data.imageDataset];
      if (!dataset) {
        return;
      }
      var img = new Image();

      img.onload = function () {
        var imageHeight = img.height;
        var imageWidth = img.width;

        _this2.setState({
          imageHeight: imageHeight,
          imageWidth: imageWidth
        });
      };

      img.src = dataset.uri;
    }
  };
}, _temp);


BlockDynamic.contextTypes = {
  datasets: _propTypes2.default.object
};

exports.default = BlockDynamic;