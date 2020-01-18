import { SIGN_OUT } from './constants.js';

//const API_URL = process.env.REACT_APP_API_URL;

/**
 * @description Listens to authentication changes from
 * firebase and dispatches authSuccess and authFailed
 * depending if user is logged in or not.
 */

/* To be rewritten and used when database and api is done.
export const authListener = () => {
    return (dispatch, getState, {getFirebase}) => {
        const auth = getFirebase().auth();
        auth.onAuthStateChanged((user) => {
            
            // if(user && user.emailVerified) {
            if (user ) {
                
                // User is signed in.
                
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                var refreshToken = user.refreshToken;

                
                dispatch({
                    type:AUTH_SUCCESS,
                    payload:user
                });

                let userRef = db.collection('users').doc(user.email);
                userRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } 
                    else {
                        listenToUserChanges()
                        dispatch({
                            type:SET_USER,
                            payload:doc.data()
                        });
                        console.log('Document data:', doc.data());
                    }
                })
                .catch(err => {
                    dispatch({
                        type:AUTH_FAILED,
                        payload:err
                    });
                    console.log('Error getting document', err);
                });
            } 
            else {
                signOut();
            }
        })
       
    }
}
*/

/**
 * @description Fetching user
 * @param {*} dispatch
 */
/* To be used when database and api is done.
const getUserData = (user, dispatch) => {

    fetch(`${API_URL}/user/${user.uid}`, {
      headers:{
        'Content-type':'application/json'
      },
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  
  };
*/

export const signOutUser = () => {
  return (dispatch, _, { getFirebase }) => {
    const auth = getFirebase().auth();
    auth
      .signOut()
      .then(function() {
        dispatch({ type: SIGN_OUT });
      })
      .catch(function(error) {
        console.log('Failed to sign out user');
      });
  };
};
