import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import * as Ons from 'react-onsenui';
import MapContainer from './MapContainer'

export default class QuizContainer extends Component {


  const quizContainer = this.refs.quiz;
  const resultsContainer = this.refs.results;
  const submitButton = this.refs.submit;

  function buildQuiz() {

    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // we'll want to store the list of answer choices
        const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {

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
    quizContainer.innerHTML = output.join('');

  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

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
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener('click', showResults);


  const myQuestions = [{
      question: "What country does this look like?",
      answers: {
        a: "Sweden",
        b: "USA",
        c: "France"
        d: "Italy"
      },
      correctAnswer: "c"
    },
    {
      question: "What country does this look like?",
      answers: {
        a: "Italy",
        b: "Sweden",
        c: "USA"
        d: "China"

      },
      correctAnswer: "b"
    },
    {
      question: "What country does this look like?",
      answers: {
        a: "Antarctica",
        b: "Exploring the Pacific Ocean",
        c: "Sitting in a tree",
        d: "Minding his own business, so stop asking"
      },
      correctAnswer: "d"
    }
  ];

}

render(){

  return(
    <div>
      <div ref="quiz"></div>
      <button ref="submit">Submit Quiz</button>
      <div ref="results"></div>
    </div>
  )

}
