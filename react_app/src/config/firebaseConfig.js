const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyAtRiw2VRLF4WDk0Un-3f5iMgV-2GZ_DQE',
  authDomain: 'iv1201-g7.firebaseapp.com',
  databaseURL: 'https://iv1201-g7.firebaseio.com',
  projectId: 'iv1201-g7',
  storageBucket: 'iv1201-g7.appspot.com',
  messagingSenderId: '797925000776',
  appId: '1:797925000776:web:8bcec045b03638e456ba7d',
  measurementId: 'G-PCKDRNB11Q',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
