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
    return (
      <div className="App">
        <TopNavbar user={null} onSignOutClick={this.handleSignOut} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-up-success" component={SignUpSuccess} />
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

  return {
    auth: auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
