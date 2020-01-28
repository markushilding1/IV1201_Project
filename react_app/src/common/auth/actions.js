import { SIGN_OUT, SET_USER } from './constants.js';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * @author Markus Hilding
 * @description Fetches user profile data from rest api.
 * @param {string} uid user id
 * @param {string} accessToken user access token (JWT token)
 */
const getUserProfile = (uid, accessToken) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/users/${uid}`, {
      headers: {
        authorization: accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok || (res.ok && res.status !== 200)) {
          resolve(false);
        }
        return res.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(false);
      });
  });
};

/**
 * @description Listens to authentication changes from
 * firebase and dispatches authSuccess and authFailed
 * depending if user is logged in or not.
 */
export const authListener = () => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getFirebase().auth();
    auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        const accessToken = getState().firebase.auth.stsTokenManager
          .accessToken;

        if (!accessToken) return;

        const uid = user.uid;
        const userData = await getUserProfile(uid, accessToken);

        if (userData) {
          dispatch({
            type: SET_USER,
            payload: userData,
          });
        }
      } else {
        signOutUser();
      }
    });
  };
};

/**
 * @description
 */
export const signOutUser = () => {
  return (dispatch, _, { getFirebase }) => {
    const auth = getFirebase().auth();
    auth
      .signOut()
      .then(function() {
        // maybe following is needed on log out
        // getFirebase().logout();

        dispatch({ type: SIGN_OUT });
      })
      .catch(function(error) {
        console.log('Failed to sign out user');
      });
  };
};
