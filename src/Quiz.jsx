import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import { firebase, firestore } from './firebase';
import Answers from './Answers';
import data from './data';
import './styles/Quiz.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.location.state.userId,
      question: 0,
      score: 0,
      isCorrect: false,
      isAnswered: false,
      zoom: 17
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidUpdate() {
    if (this.state.question > 8) {
      firestore
        .collection('scores')
        .add({
          score: this.state.score,
          user: this.state.userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  checkAnswer(answer) {
    if (!this.state.isAnswered) {
      if (answer === data[this.state.question].correct) {
        this.setState({
          score: this.state.score + 1,
          isCorrect: true,
          isAnswered: true,
          zoom: 4
        });
      } else {
        this.setState({
          isCorrect: false,
          isAnswered: true,
          zoom: 4
        });
      }
    }
  }

  nextQuestion() {
    this.setState({
      isAnswered: false,
      question: this.state.question + 1,
      zoom: 14
    });
  }

  render() {
    return (
      <div>
        <div className="topBar">
          <p>{this.state.question + 1}. What country is this?</p>
        </div>
        <Answers
          isAnswered={this.state.isAnswered}
          question={this.state.question}
          score={this.state.score}
          nextQuestion={this.nextQuestion}
          isCorrect={this.state.isCorrect}
          checkAnswer={this.checkAnswer}
        />
        <Map
          zoom={this.state.zoom}
          marker={this.state.isAnswered}
          google={this.props.google}
          center={data[this.state.question].coordinates}
        />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgN8zc0SMhlbDtZBMj0Byk7i6ORGvP9uE&'
})(Quiz);
