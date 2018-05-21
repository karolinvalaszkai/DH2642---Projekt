import React, { Component } from 'react';
import { firestore } from './firebase';
import './styles/Scores.css';
import uuid from 'uuid/v4';

class Scores extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId;
    this.state = {
      scores: [],
      users: []
    };
  }

  componentDidMount() {
    // Updating the `users` local state attribute when the Cloud Firestore 'users' collection changes.
    this.unregisterUsersObserver = firestore
      .collection('users')
      .onSnapshot(snap => {
        let users = {};
        snap.forEach(doc => {
          users[doc.id] = doc.data();
        });
        this.setState({ users: users });
      });
    // Updating the `userScore` local state attribute when the Cloud Firestore 'scores' collection changes.
    this.unregisterUserScoreObserver = firestore
      .collection('scores')
      .where('user', '==', this.userId)
      .orderBy('score', 'desc')
      .limit(1)
      .onSnapshot(snap => {
        snap.forEach(doc => {
          this.setState({ userScore: doc.data().score });
        });
      });

    this.unregisterScoresObserver = firestore
      .collection('scores')
      .orderBy('score', 'desc')
      .limit(5)
      .onSnapshot(snap => {
        let scores = [];
        snap.forEach(doc => {
          scores.push(doc.data());
        });
        this.setState({ scores: scores });
      });
  }

  componentWillUnmount() {
    // Un-register the listeners.
    this.unregisterUsersObserver();
    this.unregisterUserScoreObserver();
    this.unregisterScoresObserver();
  }

  render() {
    const highscores = this.state.scores.map(score => {
      return (
        <tr key={uuid()}>
          <td className="firstCol">{this.state.users[score.user] ? this.state.users[score.user].name : 'no name'}</td>
          <td className="secondCol">{score.score}</td>
        </tr>
      );
    });
    return (
      <div>
        <div className="welcomeContainer">
          <div className="scoresTitle">
            <h1>Quizmania</h1>
            <h3 className="scoreName">
              {this.state.users[this.userId]
                ? this.state.users[this.userId].name
                : ''}
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
            <tbody>{highscores}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Scores;
