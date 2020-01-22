import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_STATUS_RESET,
} from './constants.js';

import history from './../../utils/history';

/**
 * @author Markus Hilding
 * @description Signs the user into the application
 * and calls function to get user data if successful.
 * @param {*} email
 * @param {*} password
 */
export const signInUser = (email, password) => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch({type: SIGN_IN});
    const auth = getFirebase().auth();

    auth
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
        // Look up possible error codes to generate
        // appropiate error messages.
        // var errorCode = error.code;
          const errorMessage = error.message;
          signInFailed(dispatch, errorMessage);
        })
        .then((result) => {
          if (result && !result.user.emailVerified) {
            auth.signOut();
            signInFailed(dispatch, 'Account not verified.');
          } else if (result) {
            const accessToken = getState().firebase.auth.stsTokenManager
                .accessToken;
            fetch('http://localhost:5000/iv1201-g7/us-central1/widgets/users/', {
              headers: {
                Authorization: accessToken,
              },
            })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });

            signInSuccess(dispatch);
          // getUserData(result.user, dispatch);
          } else {
            signInFailed(
                dispatch,
                'No user with provided email and password found.',
            );
          }
        });
  };
};

/**
 * @author Markus Hilding
 * @description dispatches an successful authentification of a user.
 * @param {function} dispatch Redux dispatch
 */
const signInSuccess = (dispatch) => {
  dispatch({type: SIGN_IN_SUCCESS});

  // temporarily
  history.push('/userpage');
};

/**
 * @author Markus Hilding
 * @description Dispatches a failed sign in.
 * @param {function} dispatch Redux dispatch
 * @param {string} err Error message
 */
const signInFailed = (dispatch, err) => {
  dispatch({
    type: SIGN_IN_FAILED,
    payload: err,
  });
};

/**
 * @author Markus Hilding
 * @description Dispatches action to reset
 * error message.
 */
export const resetError = () => {
  return (dispatch) => dispatch({type: SIGN_IN_STATUS_RESET});
};
