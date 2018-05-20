import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import data from './data';

class Answers extends Component {
  next(question) {
    if (question <= 8) {
      return (
        <button
          className="quizmaniaBtn startBtn"
          onClick={this.props.nextQuestion}
        >
          Next
        </button>
      );
    } else {
      return (
        <Link className="quizmaniaBtn startBtn" to="/">
          Next
        </Link>
      );
    }
  }

  render() {
    if (this.props.isAnswered) {
      return (
        <div className="answers">
          <div className="feedbackContainer">
            <p className="feedbackText">
              {this.props.isCorrect
                ? 'Your answer was correct!'
                : 'Wrong answer!'}
            </p>
            {this.next(this.props.question)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="answers">
          <div className="answersCol">
            <button
              className="answersBtn"
              onClick={() => this.props.checkAnswer(1)}
            >
              {data[this.props.question].answers[0]}
            </button>
            <button
              className="answersBtn"
              onClick={() => this.props.checkAnswer(2)}
            >
              {data[this.props.question].answers[1]}
            </button>
          </div>
          <div className="answersCol">
            <button
              className="answersBtn"
              onClick={() => this.props.checkAnswer(3)}
            >
              {data[this.props.question].answers[2]}
            </button>
            <button
              className="answersBtn"
              onClick={() => this.props.checkAnswer(4)}
            >
              {data[this.props.question].answers[3]}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Answers;
