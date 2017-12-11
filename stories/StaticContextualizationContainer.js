import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BlockStatic from '../src/BlockStatic';

export default class StaticContainer extends Component {

  constructor(props) {
    super(props);
  }

  getChildContext () {
    return {
      datasets: this.props.datasets
    }
  }
  render() {
    const {
      props: {
        resource,
        contextualization,
        contextualizer,
        // datasets
      }
    } = this;
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };
    return (
      <div style={style}>
        <BlockStatic
          resource={resource}
          contextualizer={contextualizer}
        />
      </div>
    )
  }
}

StaticContainer.childContextTypes = {
  datasets: PropTypes.object
};  