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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.data != prevProps.data){
      const area = {id : this.props.data.areaOfExpertise, years : this.props.data.yearsOfExperience}
      this.state.areaOfExpertise.push(area);
    }
  }

  /**
   * @author Josef Federspiel
   * @description Calls submission method from actions.
   * @param {object} e onSubmit event.
   */

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
        areaOfExpertise={this.state.areaOfExpertise}
      />
    );
  }
}

const mapStateToProps = (state, initialProps) => {
  debugger;
  const temp = state.applications.application;
  const { loading, error } = state;
  return {
    loading: loading,
    error: error,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Submission));
