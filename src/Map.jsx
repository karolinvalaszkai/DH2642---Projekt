import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

class Map extends Component {
  componentDidUpdate() {
    this.loadMap();
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign(
        {},
        {
          center: this.props.center,
          zoom: this.props.zoom,
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false,
          gestureHandling: 'none',
          mapTypeId: 'hybrid'
        }
      );

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
    }
  }

  render() {
    return (
      <div ref="map" style={mapStyle}>
        loading map...
      </div>
    );
  }
}

export default Map;
