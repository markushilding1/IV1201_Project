
const admin = require("firebase-admin");
const serviceAccount = require('./configs/serviceAccount.js').serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iv1201-g7.firebaseio.com"
});

exports.firebaseAuth = admin.auth();