import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { permissionCheck } from './../../utils/permissionCheck';
import { fetchApplicants } from './actions';

/**
 * @description Container smart component for applicants page,
 * Should contain login and be connected to redux
 * @author Philip Romn
 */

class Applicants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namn: '',
      kompetens: '',
      authorized: false,
    };
  }

  permissionCheck() {
    const result = this.props.permissionCheck('recruit', 'applicants');
    if (result) {
      this.setState({
        authorized: true,
      });
      if (!this.state.data) {
        this.props.fetchApplicants();
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

  fetchData() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          applicants: data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value);
    console.log(name);
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  render() {
    return (
      <View
        authorized={this.state.authorized}
        applicants={this.props.applicants}
        loading={this.props.loading}
        error={this.props.error}
        onFormChange={this.handleFormChange}
      />
    );
  }
}

const mapDispatchToProps = {
  permissionCheck,
  fetchApplicants,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.auth.user,
    auth: state.firebase.auth,
    loading: state.applicants.loading,
    error: state.applicants.error,
    applicants: state.applicants.applicants,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applicants);

/*
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
*/
