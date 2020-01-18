import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_STATUS_RESET,
} from './constants.js';

import history from './../../utils/history';

/**
 * @author Markus Hilding
 * @description Creating a user with email and password in
 * firebase. Creates user profile in the MySQL database
 * and sends verification email to the user.
 * @param {object} data Example {
 *    fname: (string),
 *    lname: (string),
 *    email: (string),
 *    password: (string),
 * }
 */
export const signUpUser = (data) => {
  const { firstName, lastName, email, password } = data;

  return (dispatch, _, { getFirebase }) => {
    dispatch({ type: SIGN_UP });
    const auth = getFirebase().auth();

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        const errorMessage = error.message;
        signUpFailed(dispatch, errorMessage);
      })
      .then((result) => {
        if (result) {
          const user = result.user;

          // Creaste user with call to rest api. If failed, remove
          // the user from firebase users.

          // Send verificaton email to user.
          user
            .sendEmailVerification()
            .then(function() {
              auth.signOut();
              signUpSuccess(dispatch);
            })
            .catch(function() {
              console.log('Failed to send email.');
            });
        }
      })
      .catch((err) => {
        signUpFailed(dispatch, 'Oops, something went wrong...');
      });
  };
};

/**
 * @author Markus Hilding
 * @description Dispatches a failed sign up and resets
 * the status after 5 seconds.
 * @param {function} dispatch Redux dispatch
 * @param {string} err Error message
 */
const signUpFailed = (dispatch, err) => {
  dispatch({
    type: SIGN_UP_FAILED,
    payload: err,
  });
};

/**
 * @author Markus Hilding
 * @description Dispatches a successful sign up.
 * @param {function} dispatch Redux dispatch
 */
const signUpSuccess = (dispatch) => {
  setTimeout(() => {
    dispatch({ type: SIGN_UP_SUCCESS });
    history.push('/sign-up-success');
  }, 1000);
};

/**
 * @author Markus Hilding
 * @description Dispatches action to reset
 * error message.
 */
export const resetError = () => {
  return (dispatch) => dispatch({ type: SIGN_UP_STATUS_RESET });
};
