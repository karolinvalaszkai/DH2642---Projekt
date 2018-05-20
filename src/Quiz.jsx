import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { firebase, firestore } from './firebase';
import Answers from './Answers';
import data from './data';
import './styles/Quiz.css';

const mapStyle = {
  width: '100vw',
  height: '100vh',
  zIndex: '-10',
  position: 'fixed',
  top: '0',
  left: '0',
  margin: '0',
  padding: '0'
};

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      question: 0,
      score: 0,
      isCorrect: false,
      isAnswered: false,
      zoom: 14
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  checkAnswer(answer) {
    if (!this.state.isAnswered) {
      if (answer === data[this.state.question].correct) {
        this.setState({
          score: this.state.score + 1,
          isCorrect: true,
          isAnswered: true,
          zoom: 8
        });
      } else {
        this.setState({
          isCorrect: false,
          isAnswered: true,
          zoom: 6
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
          nextQuestion={this.nextQuestion}
          isCorrect={this.state.isCorrect}
          checkAnswer={this.checkAnswer}
        />
        <Map
          zoom={this.state.zoom}
          google={this.props.google}
          style={mapStyle}
          center={data[this.state.question].coordinates}
        />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgN8zc0SMhlbDtZBMj0Byk7i6ORGvP9uE&'
})(Quiz);
