// Import the Firebase modules
import firebase from 'firebase';

// Initalize and export Firebase.
firebase.initializeApp({
  apiKey: 'AIzaSyCyAqsphTnxuP8bIV9YiQt4PtY4tvbtgDc',
  authDomain: 'dm2518-quizmania.firebaseapp.com',
  databaseURL: 'https://dm2518-quizmania.firebaseio.com',
  projectId: 'dm2518-quizmania'
});

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

export { firebase, firestore };
