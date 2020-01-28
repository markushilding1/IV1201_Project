import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { signOutUser, authListener } from './common/auth/actions.js';

// Containers
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import SignUpSuccess from './containers/SignUp/Success';
import Applicants from './containers/Applicants';
import TopNavbar from './components/TopNavbar';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.props.authListener();
  }

  handleSignOut = () => {
    this.props.signOutUser();
  };

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
        </Switch>
      </div>
    );
  }
}

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
