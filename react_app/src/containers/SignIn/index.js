import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './view';
import { signInUser, resetError } from './actions';
import { checkSignedIn } from './../../utils/checkSignedIn';

const withRouter = require('react-router-dom').withRouter;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  /**
   * @author Markus Hilding
   * @description Updates state with sign in form values.
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
   * @description Calls sign in method from actions.
   * @param {object} e onSubmit event.
   */
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const next = this.props.match.params.next;
    this.props.signInUser(email, password, next);
  };

  /**
   * @description Resets the error message when
   * the user starts to type in the form after
   * a failed attempt to login.
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
  checkSignedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
