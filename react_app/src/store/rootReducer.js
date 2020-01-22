import {combineReducers} from 'redux';

import {SIGN_OUT} from './../common/auth/constants';

// Common reducers
import authReducer from '../common/auth/reducer.js';

// Container reducers
import signInReducer from '../containers/SignIn/reducer.js';
import signUpReducer from '../containers/SignUp/reducer.js';

// Firebase & Firestore reducers
import {firebaseReducer} from 'react-redux-firebase';

// Combining all reducers
const appReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  signIn: signInReducer,
  firebase: firebaseReducer,
});

const rootReducer = (state, action) => {
  state = action.payload === SIGN_OUT ? undefined : state;
  return appReducer(state, action);
};

export default rootReducer;
