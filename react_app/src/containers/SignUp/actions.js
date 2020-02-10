import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_STATUS_RESET,
} from './constants.js';

import history from './../../utils/history';

const API_URL = process.env.REACT_APP_API_URL;

const createUserProfile = (data) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/users`, {
      method: 'post',
      //Authorization: accessToken,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          resolve(false);
        }

        if (res.status === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        resolve(false);
      });
  });
};

/**
 * @author Markus Hilding
 * @description Creating a user with email and password in
 * firebase. Creates user profile in the MySQL database
 * and sends verification email to the user.
 * @param {object} data Example {
 *    name: (string),
 *    surname: (string),
 *    ssn: (string),
 *    email: (string),
 *    password: (string),
 * }
 */
export const signUpUser = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: SIGN_UP });
    const auth = getFirebase().auth();

    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .catch(function(error) {
        const errorMessage = error.message;
        signUpFailed(dispatch, errorMessage);
      })
      .then(async (result) => {
        if (result) {
          const user = result.user;
          const profileData = {
            ...data,
            uid: user.uid,
            ssn: '19940101-1234',
          };

          // Creaste user with call to rest api. If failed, remove
          // the user from firebase users.
          const createProfileResult = await createUserProfile(profileData);
          console.log(createProfileResult);
          if (createProfileResult) {
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
        }
      })
      .catch((err) => {
        console.log(err);
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
