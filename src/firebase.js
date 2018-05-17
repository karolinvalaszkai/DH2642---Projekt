// Import the Firebase modules that you need in your app.
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/datastore';

// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyCyAqsphTnxuP8bIV9YiQt4PtY4tvbtgDc',
  authDomain: 'dm2518-quizmania.firebaseapp.com',
  databaseURL: 'https://dm2518-quizmania.firebaseio.com',
  projectId: 'dm2518-quizmania'
};
export default firebase.initializeApp(config);
