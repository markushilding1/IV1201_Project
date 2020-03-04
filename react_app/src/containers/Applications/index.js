import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import {
  getAreaOfExpertise,
  submitAreaOfExpertise,
  submitAvailabilityPeriod,
} from './actions';
import Submission from './Submission/index.js';
import { permissionCheck } from './../../utils/permissionCheck';
import Moment from 'moment';
import PropTypes from 'prop-types';

const withRouter = require('react-router-dom').withRouter;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.props.getAreaOfExpertise();
    this.state = {
      areaOfExpertise: '',
      yearsOfExperience: '',
      areaOfExpertiseId: '',
      date: [new Date(), new Date()],
      authorized: false,
    };
  }

  permissionCheck() {
    const result = this.props.permissionCheck('applicant', 'applications');
    if (result) {
      this.setState({
        authorized: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user) ||
      JSON.stringify(prevProps.auth) !== JSON.stringify(this.props.auth)
    ) {
      this.permissionCheck();
    }
  }

  componentDidMount() {
    this.permissionCheck();
  }

  /**
   * @author Josef Federspiel
   * @description Updates state with dates
   * @param {object} date onChange event Example{
   *     date: (date)
   *     date: (date)
   * }.
   */

  handleDateSelect = (date) => {
    this.setState({ date });
  };

  /**
   * @author Josef Federspiel
   * @description Updates state with area of expertise form values.
   * @param {object} e onChange event.
   */

  handleExpertiseChange = (e) => {
    this.resetErrorMessage();
    const value = e.target.value;
    const id = e.target.selectedIndex;
    const name = e.target.name;
    this.setState({ [name]: value });
    this.setState({ areaOfExpertiseId: id });
  };

  /**
   * @author Josef Federspiel
   * @description Updates state with year of expertise form values.
   * @param {object} e onChange event.
   */
  handleYearChange = (e) => {
    this.resetErrorMessage();
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  /**
   * @author Josef Federspiel
   * @description Calls submit expertise method from actions.
   * @param {object} e onSubmit event.
   */

  onExpertiseSubmit = (e) => {
    e.preventDefault();
    const {
      areaOfExpertise,
      yearsOfExperience,
      areaOfExpertiseId,
    } = this.state;
    const data = {
      areaOfExpertise,
      yearsOfExperience,
      areaOfExpertiseId,
    };
    this.props.submitAreaOfExpertise(data);
  };

  /**
   * @author Josef Federspiel
   * @description Calls submit availability period method from actions.
   * @param {object} e onSubmit event.
   */

  onAvailabilityPeriodSubmit = (e) => {
    e.preventDefault();
    const fromDate = Moment(this.state.date[0]).format('YYYY-MM-DD');
    const toDate = Moment(this.state.date[1]).format('YYYY-MM-DD');
    const date = { fromDate, toDate };
    this.props.submitAvailabilityPeriod(date);
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
    const { error, loading, list } = this.props;
    return (
      <View
        error={error}
        loading={loading}
        expertiseDropDown={list}
        date={this.state.date}
        onExpertiseChange={this.handleExpertiseChange}
        onYearsChange={this.handleYearChange}
        onExpertiseSubmit={this.onExpertiseSubmit}
        onAvailabilitySubmit={this.onAvailabilityPeriodSubmit}
        onDateSelect={this.handleDateSelect}
        component={<Submission />}
      />
    );
  }
}

Applications.propTypes = {
  getAreaOfExpertise: PropTypes.func,
  submitAreaOfExpertise: PropTypes.func,
  submitAvailabilityPeriod: PropTypes.func,
  permissionCheck: PropTypes.func,
  error: PropTypes.object,
  resetError: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { loading, error, list } = state.applications;

  return {
    loading: loading,
    error: error,
    list: list,
  };
};

const mapDispatchToProps = {
  getAreaOfExpertise,
  submitAreaOfExpertise,
  submitAvailabilityPeriod,
  permissionCheck,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Applications));
