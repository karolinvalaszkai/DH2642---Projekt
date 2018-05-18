import React, { Component } from 'react';
import { firestore } from './firebase';

class Scores extends Component {
  constructor(props) {
    super(props);
    this.userRef = firestore.collection('users').doc(this.props.userId);
    this.state = {
      userName: ''
    };
  }

  componentDidMount() {
    this.userRef.get().then(doc => {
      const data = doc.data();
      this.setState({
        userName: data.name
      });
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.userName}</h2>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </div>
    );
  }
}

export default Scores;
