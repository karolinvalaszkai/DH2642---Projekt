import React, { Component } from 'react';
import * as Ons from 'react-onsenui';
import logo from './logo.svg';
import './App.css';
import { Link  } from 'react-router-dom'
import Main from './Main'


/*const LoginLink = () => (
<Link to='/login'>Login</Link>
)*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Quizmania</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='/login'>Login</Link>
        <Main/>
      </div>
    );
  }
}





export default App;