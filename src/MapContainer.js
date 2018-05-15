import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import * as Ons from 'react-onsenui';

export default class MapContainer extends Component {

  state = {
    locations: [
      { name: "New York County Supreme Court", location: {lat: 40.7143033, lng: -74.0036919} },
      { name: "Queens County Supreme Court", location: {lat: 40.7046946, lng: -73.8091145} },
      { name: "Kings County Supreme Court", location: {lat: 40.6940226, lng: -73.9890967} },
      { name: "Richmond County Supreme Court", location: {lat: 40.6412336, lng: -74.0768597} },
      { name: "Bronx Supreme Court", location: {lat: 40.8262388, lng: -73.9235238} }
    ]
  }
  


  componentDidUpdate() {
    var zoomRate = 20;
    console.log("componentDidUpdate",this.countryNumber)
    if (this.countryNumber === undefined){
      this.countryNumber = 0;
    }

    if (this.countryNumber === 9){
      console.log("KLAAAART")
    }

    if (this.state.isToggleOn === true){
      zoomRate = 20
    };
    if (this.state.isToggleOn === false){
      zoomRate = 2
      this.countryNumber = this.countryNumber + 1;
    };
    this.loadMap(zoomRate,this.countryNumber); // call loadMap function to load the google map


  }

  loadMap(zoomRate,countryNumber) {
    console.log("zoomRate:",zoomRate);
    console.log("countryNumber:",countryNumber);


    var countries = [
                    {country: "France", coordinates: {lat: 48.858289, lng: 2.294261}},
                    {country: "Sweden", coordinates: {lat: 59.3498092, lng: 18.0684758}},
                    {country: "U.S.A.", coordinates: {lat: 40.689806, lng: -74.044483}}


                    ];
    if (this.props && this.props.google) { // checks to make sure that props have been passed
 
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: countries[countryNumber].coordinates, // sets center of google map to NYC.
        //zoom: this.zoomRate, // sets zoom. Lower numbers are zoomed further out.
      // zoom: function zoom(map, _zoom) {
      //     map.setZoom(_zoom);
      //   },
      zoom: zoomRate,

      //Disable all google maps functions
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false,



        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

    }
  }

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

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

      <button onClick={this.showHideAnswer}>
         {this.state.isToggleOn ? 'Show answer' : 'Hide answer'}
      </button>
      
      {/*
      <button onClick={this.handleClick}>
         {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>

      <button onClick={this.zoomOut}>
      Show answer
      </button>

      <button onClick={this.zoomIn}>
      Next
      </button>

      // <Ons.Page>
      //   <Ons.Button onClick={this.handleClick}>Tap me!</Ons.Button>
      // </Ons.Page>
      */}
      <div ref="map" style={style}>
        loading map...
      </div>
      </div>
    )
  }
}