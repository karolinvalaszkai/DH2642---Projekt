import React, { Component } from 'react';
import { firestore } from './firebase';
import './styles/Scores.css';

class Scores extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId;
    this.state = {};
  }

  componentDidMount() {
    // Updating the `user` local state attribute when the Cloud Firestore 'user' document changes.
    this.unregisterUserObserver = firestore
      .collection('users')
      .doc(this.userId)
      .onSnapshot(snap => {
        this.setState({ user: snap.data() });
      });
    // Updating the `userScore` local state attribute when the Cloud Firestore 'scores' collection changes.
    this.unregisterUserScoreObserver = firestore
      .collection('scores')
      .where('user', '==', this.userId)
      .orderBy('score', 'desc')
      .limit(1)
      .onSnapshot(snap => {
        this.setState({ userScore: snap.docs[0].data().score });
      });
  }

  componentWillUnmount() {
    // Un-register the listeners.
    this.unregisterUserObserver();
    this.unregisterUserScoreObserver();
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
          <p>{this.state.userScore ? this.state.userScore : '0'} points</p>
        </div>
        <div className="scoresTableContainer">
          <h3>Worldwide Highscore:</h3>
          <table className="scoresTable">
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Scores;
