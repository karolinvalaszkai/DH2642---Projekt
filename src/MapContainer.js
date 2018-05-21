import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MapContainer extends Component {



  componentDidUpdate() {

    console.log("Zoom: ",this.props.zoomRate);
    console.log("MapContainer currentCountry: ", this.props.currentCountry);

    this.countries = [
                {country: "France", coordinates: {lat: 48.858289, lng: 2.294261}},
                {country: "Sweden", coordinates: {lat: 59.3470962, lng: 18.0724084}},
                {country: "U.S.A.", coordinates: {lat: 40.689806, lng: -74.044483}},
                {country: "Italy", coordinates: {lat: 41.890000, lng: 12.491944}},
                {country: "India", coordinates: {lat: 27.174000, lng: 78.042100}},
                {country: "China", coordinates: {lat: 39.916667, lng: 116.396973}},
                {country: "Vatican City State", coordinates: {lat: 41.901944, lng: 12.456944}},
                {country: "Australia", coordinates: {lat: -33.857197, lng: 151.21514}},
                {country: "Peru", coordinates: {lat: -13.163056, lng: -72.545556}},
                {country: "Egypt", coordinates: {lat: 29.979175, lng: 31.134358}}

                ];

  this.loadMap(); // call loadMap function to load the google map


  }

  loadMap() {

    if (this.props && this.props.google) { // checks to make sure that props have been passed

      const {
        google
      } = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: this.countries[this.countryNumber - 1].coordinates, // sets center of google map to NYC.
        zoom: this.props.zoomRate,

      //Disable all google maps functions
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false,
      gestureHandling: 'none',



        mapTypeId: 'hybrid' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
        position: this.countries[this.countryNumber - 1].coordinates, // sets position of marker to specified location
        map: this.map, // sets markers to appear on the map we just created on line 35
        title: "Where is this?", // the title of the marker is set to the name of the location
        icon: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Lol_question_mark.png',
          scaledSize: new google.maps.Size(30, 30)
        },
      });

    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.showHideAnswer = this.showHideAnswer.bind(this);
  }


  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn

    }));
  }
  // zoomIn() {
  //     var zoomRate = 20;
  //     this.componentDidUpdate();

  //   }
  // zoomOut() {
  //     var zoomRate = 2;
  //     this.componentDidUpdate();
  //   }

  showHideAnswer() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn


    }));


  }



  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '90vw', // 90vw basically means take up 90% of the width screen. px also works.
      height: '75vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div>

      <button onClick = {this.showHideAnswer}>
      {
        this.state.isToggleOn ? 'Show answer' : 'Hide answer'
      } 
      </button>

      <div ref = "map" style = {style} >
      loading map...
      </div>
      </div>
    )
  }
  }
