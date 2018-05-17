import React, { Component } from 'react';
import { firebase } from './firebase';

class Scores extends Component {
  componentDidMount() {
    console.log(this.props.user);
  }

  render() {
    return (
      <div>
        <h2>{this.props.user.displayName}</h2>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </div>
    );
  }
}

export default Scores;
