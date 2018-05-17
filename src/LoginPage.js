import React, { Component } from 'react';
import firebase from './firebase';
import firebaseui from 'firebaseui';

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

class LoginPage extends Comment {
  state = {
    isSignedIn: false,
    userProfile: null
  };

  componentDidMount() {
    // Updating the `isSignedIn` and `userProfile` local state attributes when the Firebase Auth
    // state changes.
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user, userProfile: user });
    });
  }

  componentWillUnmount() {
    // Un-registers the auth state observer.
    this.unregisterAuthObserver();
  }
}
