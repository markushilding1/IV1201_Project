import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { submitApplication, resetError } from './actions';

const withRouter = require('react-router-dom').withRouter;

class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areaOfExpertise: [],
      availabilityPeriod: [],
    };
  }

  /**
   * @author Josef Federspiel
   * @description Calls submission method from actions.
   * @param {object} e onSubmit event.
   */
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { areaOfExpertise, availabilityPeriods } = this.state;

    const data = {
      areaOfExpertise,
      availabilityPeriods,
    };

    this.props.signUpUser(data);
  };

  /**
   * @description Resets the error message when
   * the user starts to type in the form after
   * a failed attempt to sign up.
   */
  resetErrorMessage = () => {
    const { error } = this.props;
    if (error) {
      this.props.resetError();
    }
  };

  render() {
    const { error, loading } = this.props;

    return (
      <View
        error={error}
        loading={loading}
        onFormSubmit={this.handleFormSubmit}
        onFormChange={this.handleFormChange}
      />
    );
  }
}

const mapStateToProps = (state, initialProps) => {
  const { loading, error } = state.signIn;
  return {
    loading: loading,
    error: error,
  };
};

const mapDispatchToProps = {
  signInUser,
  resetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
