import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { discardApplication, submitApplication } from './actions';

const withRouter = require('react-router-dom').withRouter;

class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * @description calls the discard application
   * from actions, on click function.
   */
  onDiscardApplication = () => {
    this.props.discardApplication();
  };

  /**
   * @description calls the submit application
   * from actions, on click function.
   */
  handleSubmitApplication = (e) => {
    e.preventDefault();
    this.props.submitApplication();
  };

  render() {
    const { expertise, availability, error, loading, success } = this.props;
    return (
      <View
        error={error}
        loading={loading}
        areaOfExpertise={expertise}
        availabilityPeriod={availability}
        submissionSuccess={success}
        onDiscardApplication={this.onDiscardApplication}
        onSubmitApplication={this.handleSubmitApplication}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    loading,
    error,
    areaOfExpertise,
    availabilityPeriod,
    submissionSuccess,
  } = state.submission;
  return {
    expertise: areaOfExpertise,
    availability: availabilityPeriod,
    loading: loading,
    error: error,
    success: submissionSuccess,
  };
};

const mapDispatchToProps = {
  discardApplication,
  submitApplication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Submission));
