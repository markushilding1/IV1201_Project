import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { permissionCheck } from './../../utils/permissionCheck';
import { fetchApplicants, fetchApplicant } from './actions';

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
      showModal: false,
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

  /**
   * @description Function to handle input changes in form
   * @author Philip Romin
   * @param e Event object containing information about which input changed
   */
  handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  /**
   * @description Function to fetch applicants from server
   * @author Philip Romin
   */
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

  /**
   * @description Function to handle input changes in our data range picker
   * @author Philip Romin
   * @param startDate Containing information about the selected start date
   * @param endDate Containing information about the selected end date
   */
  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  /**
   * @description Function to handle focused range date picker
   * @author Philip Romin
   * @param focusedInput Containing information about which field is focused
   */
  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  /**
   * @description Function to handle pagination page clicks
   * @author Philip Romin
   * @param data Object containing information about which page is clicked
   */
  handlePageClick = (data) => {
    const selected = data.selected;
    const page = selected;

    this.setState({ page }, () => {
      this.getApplicants();
    });
  };

  /**
   * @description Function to handle submission of search form
   * @author Philip Romin
   */
  handleFormSubmit = () => {
    this.setState({ page: 0 }, () => {
      this.getApplicants();
    });
  };

  toggleModal = (applicationId) => {
    console.log('Applicant with id ' + applicationId + ' clicked');
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));

    if (applicationId) {
      this.props.fetchApplicant(applicationId);
    }
  };

  updateApplicationStatus = (applicationId, status) => {
    console.log(applicationId);
    console.log(status);
    fetch(
      `http://localhost:5000/iv1201-g7/us-central1/widgets/applications/${applicationId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status: status }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then(() => {
        console.log('UPDATE SUCCESSFUL');
        this.props.fetchApplicant(applicationId);
      })
      .catch((err) => {
        console.log('ERROR UPDATING STATUS');
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
        showModal={this.state.showModal}
        toggleModal={this.toggleModal}
        updateApplicationStatus={this.updateApplicationStatus}
      />
    );
  }
}

const mapDispatchToProps = {
  permissionCheck,
  fetchApplicants,
  fetchApplicant,
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
