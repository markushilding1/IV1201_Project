import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import View from './view';
import {signUpUser, resetError} from './actions';
import {checkSignedIn} from './../../utils/checkSignedIn';

const withRouter = require('react-router-dom').withRouter;

/**
 * @description View model for sign up page.
 */
class SignUp extends Component {
  /* eslint-disable require-jsdoc*/
  constructor(props) {
    super(props);

    this.state = {};

  }

  /**
   * @author Markus Hilding
   * @description Calls sign up method from actions.
   * @param {object} values form values
   */
  handleFormSubmit = (values) => {
    const {
      name,
      surname,
      ssn,
      email,
      password,
      passwordVerification,
    } = values;

    if (password === passwordVerification) {
      const data = {
        name,
        surname,
        ssn,
        email,
        password,
      };

      this.props.signUpUser(data);
    } else {
      this.setState({
        passwordError: 'Passwords does not match',
      });
    }
  }

  /**
   * @description Resets the error message when
   * the user starts to type in the form after
   * a failed attempt to sign up.
   */
  resetErrorMessage() {
    const {error} = this.props;
    if (error) {
      this.props.resetError();
    }
  }

  /* eslint-disable require-jsdoc*/
  render() {
    const {error, loading} = this.props;

    this.props.checkSignedIn();

    return (
      <View
        error={error}
        loading={loading}
        onFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

SignUp.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  checkSignedIn: PropTypes.func,
  resetError: PropTypes.func,
  signUpUser: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {loading, error} = state.signUp;
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
