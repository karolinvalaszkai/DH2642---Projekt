import React, { Component } from 'react';

import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'





class Quiz extends Component {
  render() {
    return (
      <div>
        <MapContainer google={this.props.google} onClick={console.log("Map clicked")} onDragend={console.log("Drag end")}/>
      </div>

    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgN8zc0SMhlbDtZBMj0Byk7i6ORGvP9uE&',
})(Quiz)
