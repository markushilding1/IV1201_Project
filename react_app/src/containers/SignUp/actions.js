import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_STATUS_RESET,
} from './constants.js';

import history from './../../utils/history';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * @description Sends request to create a user to the server.
 * @param {object} data
 * @return {Promise}
 */
const createUserProfile = (data) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((res) => {
          if (!res.ok) resolve(false);
          if (res.status === 200) resolve(true);
          resolve(false);
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
 * @return {function}
 */
export const signUpUser = (data) => {
  return (dispatch, _, {getFirebase}) => {
    dispatch({type: SIGN_UP});
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
            };

            // Creaste user with call to rest api. If failed, remove
            // the user from firebase users.
            const createProfileResult = await createUserProfile(profileData);

            if (createProfileResult) {
            // Send verificaton email to user.
              user
                  .sendEmailVerification()
                  .then(function() {
                    signUpSuccess(dispatch);
                  })
                  .catch(function(err) {
                    console.err('Failed to send email.');
                  });
            }
          }
        })
        .catch((err) => {
          console.err(err);
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
    dispatch({type: SIGN_UP_SUCCESS});
    history.push('/sign-up-success');
  }, 1000);
};

/**
 * @author Markus Hilding
 * @description Dispatches action to reset
 * error message.
 * @return {function}
 */
export const resetError = () => {
  return (dispatch) => dispatch({type: SIGN_UP_STATUS_RESET});
};
