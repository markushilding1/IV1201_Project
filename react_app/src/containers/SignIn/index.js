import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import View from './view';
import { signInUser, resetError } from './actions';
import { checkSignedIn } from './../../utils/checkSignedIn';

const withRouter = require('react-router-dom').withRouter;

/**
 * @description View model for sign in page
 */
class SignIn extends Component {
  /* eslint-disable require-jsdoc*/
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * @author Markus Hilding
   * @description Calls sign in method from actions.
   * @param {object} values form values.
   */
  handleFormSubmit = (values) => {
    const { email, password } = values;
    const next = this.props.match.params.next;
    this.props.signInUser(email, password, next);
  };

  /**
   * @description Resets the error message when
   * the user starts to type in the form after
   * a failed attempt to login.
   */
  resetErrorMessage() {
    const { error } = this.props;
    if (error) {
      this.props.resetError();
    }
  }

  render() {
    const { error, loading } = this.props;

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

SignIn.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      next: PropTypes.string,
    }),
  }),
  signInUser: PropTypes.func,
  error: PropTypes.object,
  resetError: PropTypes.func,
  loading: PropTypes.bool,
  checkSignedIn: PropTypes.func,
};

const mapStateToProps = (state) => {
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
