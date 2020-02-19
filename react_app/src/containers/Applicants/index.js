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
      page: 0,
      name: '',
      competence: '',
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
    const { name, competence, startDate, endDate, sort, page } = this.state;

    const data = {
      name,
      competence,
      fromDate: startDate?.format('YYYY-MM-DD'),
      toDate: endDate?.format('YYYY-MM-DD'),
      sort,
      page,
    };

    this.props.fetchApplicants(data);
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = (focusedInput) => {
    console.log(focusedInput);
    this.setState({ focusedInput });
  };

  handlePageClick = (data) => {
    console.log(data);
    const selected = data.selected;
    const page = Math.ceil(selected);

    this.setState({ page }, () => {
      this.getApplicants();
    });
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
        handlePageClick={this.handlePageClick}
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
