
const admin = require("firebase-admin");


const env = process.env.FUNCTIONS_EMULATOR;
/*
if(env === 'true'){
  const serviceAccount = require('./configs/serviceAccount.js').serviceAccount;
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iv1201-g7.firebaseio.com"
  });
} else {
  admin.initializeApp({
    databaseURL: "https://iv1201-g7.firebaseio.com"
  });
}
*/

// Uncomment for db migration

const serviceAccount = require('./configs/serviceAccount.js').serviceAccount;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iv1201-g7.firebaseio.com"
});






exports.firebaseAuth = admin.auth();