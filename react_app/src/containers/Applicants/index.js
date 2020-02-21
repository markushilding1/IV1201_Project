import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { permissionCheck } from './../../utils/permissionCheck';
import { fetchApplicants } from './actions';

/**
 * @description Container smart component for applicants page,
 * Should contain login and be connected to redux
 * @author Philip Romin
 */
class Applicants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      namn: '',
      kompetens: '',
      startDate: null,
      endDate: null,
      sort: '',
      focusedInput: null,
      authorized: false,
    };
  }

  permissionCheck() {
    const result = this.props.permissionCheck('recruit', 'applicants');
    if (result) {
      this.setState({
        authorized: true,
      });
      if (this.props.applicants.length === 0) {
        this.getApplicants();
      }
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

  handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  getApplicants = () => {
    const { namn, kompetens, startDate, endDate, sort } = this.state;

    const data = {
      namn,
      kompetens,
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: endDate?.format('YYYY-MM-DD'),
      sort,
    };

    this.props.fetchApplicants(data);
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  render() {
    return (
      <View
        {...this.props}
        authorized={this.state.authorized}
        applicants={this.props.applicants}
        loading={this.props.loading}
        error={this.props.error}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onFormChange={this.handleFormChange}
        onSubmit={this.getApplicants}
        focusedInput={this.state.focusedInput}
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

const mapDispatchToProps = {
  permissionCheck,
  fetchApplicants,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    auth: state.firebase.auth,
    loading: state.applicants.loading,
    error: state.applicants.error,
    applicants: state.applicants.applicants,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applicants);
