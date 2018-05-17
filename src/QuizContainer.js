import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import * as Ons from 'react-onsenui';
import MapContainer from './MapContainer'

export default class QuizContainer extends Component {


  buildQuiz() {

    this.quizContainer = this.refs.quiz;
    this.resultsContainer = this.refs.results;
    const submitButton = this.refs.submit;

    this.myQuestions = [{
        question: "What country does this look like?",
        answers: {
          a: "Sweden",
          b: "USA",
          c: "France",
          d: "Italy"
        },
        correctAnswer: "c"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "Italy",
          b: "Sweden",
          c: "USA",
          d: "China"
        },
        correctAnswer: "b"
      },
      {
        question: "What country does this look like?",
        answers: { a: "Spain",
          b: "Canada",
          c: "U.S.A.",
          d: "Norway"
        },
        correctAnswer: "c"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "Greece",
          b: "Cyprus",
          c: "Italy",
          d: "Croatia"
        },
        correctAnswer: "c"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "India",
          b: "Bali",
          c: "Japan",
          d: "Thailand"
        },
        correctAnswer: "a"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "Denmark",
          b: "Indonesia",
          c: "Taiwan",
          d: "China"
        },
        correctAnswer: "d"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "Denmark",
          b: "Vatican City State",
          c: "Moldavia",
          d: "China"
        },
        correctAnswer: "b"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "Australia",
          b: "Indonesia",
          c: "Taiwan",
          d: "China"
        },
        correctAnswer: "a"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "Denmark",
          b: "Peru",
          c: "Taiwan",
          d: "China"
        },
        correctAnswer: "b"
      },
      {
        question: "What country does this look like?",
        answers: {
          a: "India",
          b: "China",
          c: "Egypt",
          d: "Croatia"
        },
        correctAnswer: "c"
      }
    ];

    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    this.myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // we'll want to store the list of answer choices
        const answers = [];

        // and for each available answer...
        for (var letter in currentQuestion.answers) {

          // ...add an HTML radio button
          answers.push(
            `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    this.quizContainer.innerHTML = output.join('');

  }


  // constructor(props) {
  //   super(props);
  //
  //     // This binding is necessary to make `this` work in the callback
  //     this.buildQuiz = this.buildQuiz.bind(this);
  //   }

  showResults() {
    // gather answer containers from our quiz
    const answerContainers = this.quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    this.myQuestions.forEach((currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question' + questionNumber + ']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
this.resultsContainer.innerHTML = `${numCorrect} out of ${this.myQuestions.length}`;
  }




render(){

  return(
    <div>
      <div ref="quiz"></div>
      <button ref="submit" onClick = {this.showResults}>Submit Quiz</button>
      <div ref="results"></div>
    </div>
  )

}

}
