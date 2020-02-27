const firebaseAuth = require('./../../../firebaseAdmin.js').firebaseAuth;

/**
 * @description Verifies the user session token sent from client
 * @param {string} idToken JWT token (Firebase 'accessToken')
 */
exports.verifyIdToken = (idToken) => {
  // Verify the ID token while checking if the token is revoked by passing
  // checkRevoked true.
  let checkRevoked = true;
  
  return new Promise((resolve, reject) => {
    if(!idToken){
      reject(new Error('No JWT token provided'));
    }

    firebaseAuth.verifyIdToken(idToken, checkRevoked)
      .then(res => {
        resolve(res);
        return;
      })
      .catch((err) => {
        reject(err);
      });
  });
};