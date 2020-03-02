import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

// Actions
import { signOutUser, authListener } from './common/auth/actions.js';

// Containers
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import SignUpSuccess from './containers/SignUp/Success';
import Applicants from './containers/Applicants';
import Applications from './containers/Applications';
import TopNavbar from './components/TopNavbar';
import PermissionDenied from './containers/PermissionDenied';

import './App.css';

/**
 * @description Root component. Manages mostly routing and rendering
 * top navigation bar.
 */
class App extends Component {
  /* eslint-disable require-jsdoc*/
  constructor(props) {
    super(props);
    this.authListener = this.props.authListener();
  }

  /**
   * @description Calls action to sign out user.
   */
  handleSignOut = () => {
    this.props.signOutUser();
  };

  /* eslint-disable require-jsdoc*/
  render() {
    const { auth, user, userLoading } = this.props;

    if (!auth.isLoaded) {
      return null;
    }

    return (
      <div className="App">
        <TopNavbar
          auth={auth}
          user={user}
          userLoading={userLoading}
          onSignOutClick={this.handleSignOut}
        />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in/:next" component={SignIn} />
          <Route path="/sign-in/" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-up-success" component={SignUpSuccess} />
          <Route path="/applicants" component={Applicants} />
          <Route path="/applications" component={Applications} />
          <Route path="/permission-denied" component={PermissionDenied} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object,
  user: PropTypes.object,
  userLoading: PropTypes.bool,
  authListener: PropTypes.func,
  signOutUser: PropTypes.func,
};

const mapDispatchToProps = {
  signOutUser,
  authListener,
};

const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
  const user = state.auth.user;
  const userLoading = state.auth.loading;

  return {
    auth: auth,
    user: user,
    userLoading: userLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
