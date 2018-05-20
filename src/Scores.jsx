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
        <div className="welcomeContainer">
          <div className="scoresTitle">
            <h1>Quizmania</h1>
            <h3 className="scoreName">
              {this.state.user ? this.state.user.name : ''}
            </h3>
          </div>
        </div>
        <div className="userScore">
          <h3>Your Highscore:</h3>
          <p>5 points</p>
        </div>
        <div className="scoresTableContainer">
          <h3>Worldwide Highscore:</h3>
          <table className="scoresTable">
            {/* <tr>
              <th className="firstCol">Name</th>
              <th className="secondCol">Score</th>
            </tr> */}
            <tr>
              <td className="firstCol">Axel Ekwall</td>
              <td className="secondCol">7</td>
            </tr>
            <tr>
              <td className="firstCol">Axel Ekwall</td>
              <td className="secondCol">7</td>
            </tr>
            <tr>
              <td className="firstCol">Axel Ekwall</td>
              <td className="secondCol">7</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Scores;
