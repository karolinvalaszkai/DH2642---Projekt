import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase, firestore } from './firebase';
import { Link } from 'react-router-dom';
import Scores from './Scores';
import './Home.css';

class Home extends Component {
  state = {
    isSignedIn: false,
    userProfile: null
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    // Updating the `isSignedIn` and `userProfile` local state attributes when the Firebase Auth
    // state changes.
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user, userProfile: user });
      const ref = firestore.collection('users');
      if (user) {
        ref
          .doc(user.uid)
          .set({
            name: user.displayName,
            img: user.photoURL,
            email: user.email
          })
          .then(() => {
            console.log('User created or updated');
          });
      }
    });
  }

  componentWillUnmount() {
    // Un-registers the auth state observer.
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="startContainer">
          <div className="welcomeContainer">
            <h3>Welcome to</h3>
            <h1>Quizmania!</h1>
          </div>
          <div className="loginButtonContainer">
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Scores userId={this.state.userProfile.uid} />
        {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        <div className="loginButtonContainer quizBtn">
          <Link to="/quiz">Start Quiz</Link>
        </div>
      </div>
    );
  }
}

export default Home;
