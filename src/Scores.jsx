import React, { Component } from 'react';
import { firestore } from './firebase';
import './styles/Scores.css';

class Scores extends Component {
  constructor(props) {
    super(props);
    this.userRef = firestore.collection('users').doc(this.props.userId);
    this.state = {};
  }

  componentDidMount() {
    // Updating the `someDocument` local state attribute when the Cloud Firestore 'someDocument' document changes.
    this.unregisterUserObserver = this.userRef.onSnapshot(snap => {
      this.setState({ user: snap.data() });
    });
  }

  componentWillUnmount() {
    // Un-register the listeners.
    this.unregisterUserObserver();
  }

  render() {
    return (
      <div>
        <h2>{this.state.user ? this.state.user.name : ''}</h2>
      </div>
    );
  }
}

export default Scores;
