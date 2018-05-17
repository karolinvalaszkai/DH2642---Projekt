import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link  } from 'react-router-dom'
import Main from './Main'

{/* function handleClick(e)  {
   e.preventDefault();
  console.log('this is:', this);
}
*/}


const QuizLink = () => (
<Link to='/quiz'>Load Quiz Map</Link>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Quizmania</h1>
        </header>
        <p className="App-intro">
          Test
        </p>
        <QuizLink/>
      {/* QuizLink: Länkar vidare till vår Quizkomponent /Sabina & Karolin */}
        <Main/>
      </div>
    );
  }
}





export default App;
