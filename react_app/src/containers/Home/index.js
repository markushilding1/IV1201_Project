import React, {Component} from 'react';
import {connect} from 'react-redux';
import View from './view';

const withRouter = require('react-router-dom').withRouter;

class Home extends Component {
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
