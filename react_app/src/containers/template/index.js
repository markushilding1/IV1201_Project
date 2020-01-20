import React, { Component } from 'react';
import { connect } from 'react-redux';
import { componse } from 'redux';
import View from './view';

import { exportedFunction } from './actions';

const withRouter = require('react-router-dom').withRouter;

class ClassName extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View />;
  }
}

const mapStateToProps = (state, initialProps) => {
  return {};
};

const mapDispatchToProps = {
  exportedFunction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ClassName));
