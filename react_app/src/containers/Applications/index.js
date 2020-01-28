import React, {Component} from 'react';
import {connect} from 'react-redux';
import {componse} from 'redux';
import View from './view';

import {exportedFunction} from './actions';

const withRouter = require('react-router-dom').withRouter;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
    areaOfExpertise: '',
    yearsOfExperience: '',
    fromDate:'',
    toDate:'',
    };
  }

    handleFormChange = (e) => {
      console.log(e.target.name)
        this.resetErrorMessage();
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { areaOfExpertise, yearsOfExperience, fromDate, toDate } = this.state;

        const data = {
            areaOfExpertise,
            yearsOfExperience,
            fromDate,
            toDate,
        };

        this.props.signUpUser(data);
    };
    resetErrorMessage = () => {
        const { error } = this.props;
        if (error) {
            this.props.resetError();
        }
    };


  render() {
      const { error, loading } = this.props;
    return <View
        error={error}
        loading={loading}
        onFormSubmit={this.handleFormSubmit}
        onFormChange={this.handleFormChange}
    />;
  }
}

const mapStateToProps = (state, initialProps) => {
  return {};
};

const mapDispatchToProps = {
  exportedFunction,
};

export default connect(mapStateToProps, mapDispatchToProps,)(withRouter(Applications));
