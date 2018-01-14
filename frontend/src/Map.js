import React, { Component } from 'react';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
// const google = window.google; 
const google = window.google;

class MyMapComponent extends Component{

  state = {

  }

  renderMarkers = () => {
    const props = this.props;
    const data = this.props.markerData;
    // const markers = 
    console.log('++++++++++++++++++++++++');
    console.log(data);
    const markers = [];
    for (let i = 0; i < data.length; i++) {
        const marker = (
        <Marker position={{lat:data[i].latitudine, lng: data[i].longitudine}} onClick={props.onMarkerClick} key={i}>
          <InfoBox
            onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                { data[i].detalii }
              </div>
            </div>
          </InfoBox>
        </Marker>
      );

      const marker1 = (
        <MarkerWithLabel
          position={{lat:data[i].latitudine, lng: data[i].longitudine}}
          labelAnchor={new google.maps.Point(0, 0)} 
          labelStyle={{backgroundColor: "yellow", fontSize: "10px", padding: "5px"}}
          key={i}
        >
          <div> { data[i].detalii }</div>
        </MarkerWithLabel>)
        // markers.push(marker);
        markers.push(marker1);
    }
    return markers;

  }

  render() {
    const props = this.props;
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 44.18, lng: 28.63 }}
      >
        { this.renderMarkers() }
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: "http://maps.googleapis.com/maps/api/js?key=AIzaSyA9MXUxxh78IFm2Ok2PmoVTe-I0LEjG2Zk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MyMapComponent);