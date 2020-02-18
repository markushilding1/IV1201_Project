import React, {Component} from 'react';
import {connect} from 'react-redux';
import View from './view';

const withRouter = require('react-router-dom').withRouter;

/**
 * @description Home page
 */
class Home extends Component {
  /* eslint-disable require-jsdoc*/
  constructor(props) {
    super(props);

    this.state = {};
  }

  /* eslint-disable require-jsdoc*/
  render() {
    return <View />;
  }
}

const mapStateToProps = (state, initialProps) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
