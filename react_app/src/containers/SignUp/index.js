import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { signUpUser, resetError } from './actions';
import { checkSignedIn } from './../../utils/checkSignedIn';

const withRouter = require('react-router-dom').withRouter;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surame: '',
      ssn: '',
      email: '',
      password: '',
      passwordVerification: '',
    };
  }

  /**
   * @author Markus Hilding
   * @description Updates state with sign up form values.
   * @param {object} e onChange event.
   */
  handleFormChange = (e) => {
    this.resetErrorMessage();
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  /**
   * @author Markus Hilding
   * @description Calls sign up method from actions.
   * @param {object} e onSubmit event.
   */
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, surname, ssn, email, password } = this.state;

    const data = {
      name,
      surname,
      ssn,
      email,
      password,
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

    this.props.checkSignedIn();

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

const mapStateToProps = (state) => {
  const { loading, error } = state.signUp;
  return {
    loading: loading,
    error: error,
  };
};

const mapDispatchToProps = {
  signUpUser,
  resetError,
  checkSignedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
