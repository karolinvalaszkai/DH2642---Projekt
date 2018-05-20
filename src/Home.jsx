import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase, firestore } from './firebase';
import { Link } from 'react-router-dom';
import Scores from './Scores';
import './styles/Home.css';
import earth from './images/earth.jpg';

const backgroundImg = {
  backgroundImage: 'url(' + earth + ')'
};

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
        <div className="startContainer" style={backgroundImg}>
          <div className="welcomeContainer">
            <div className="startTitle">
              <h3>Welcome to</h3>
              <h1>Quizmania!</h1>
            </div>
          </div>
          <div className="loginContainer">
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
        <button
          className="logoutBtn quizmaniaBtn"
          onClick={() => firebase.auth().signOut()}
        >
          X
        </button>
        <Scores userId={this.state.userProfile.uid} />
        <div className="loginContainer">
          <Link className="quizmaniaBtn startBtn" to="/quiz">Start Quiz</Link>
        </div>
      </div>
    );
  }
}

export default Home;
