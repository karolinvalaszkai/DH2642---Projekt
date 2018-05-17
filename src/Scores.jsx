import React, { Component } from 'react';
import { firebase } from './firebase';

class Scores extends Component {

  componentDidMount() {
    console.log(firebase.auth().currentUser)
  }
  
  render() {
    return(
      <div></div>
    );
  }
}