
import {BingMap, BingPushpin} from "./bingmap";
import {default as React, Component} from "react";

const YOUR_BING_MAP_API_KEY = 'AqJvZhzRi46_ZBbqXDcbpPZhe13Gjx0S9-hsBP52uUTQaGCZTP7P1BD9BI7BSzW6';

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
                  location: {
                      latitude: 25.0112183,
                      longitude: 121.52067570000001
                  },
                  draggable: false,
                  locationServiceCB: (location) => "<b><u>Location</u></b>: {2}<br>Coordinates {0},{1}".format(location.point.coordinates[0], location.point.coordinates[1], location.name),
                  icon: 'beacon.png',
                  width: 25, height: 39,
                  key: Date.now()
    }]};
  }
  
  render () {
  let defaultView = [{
       center: {
         latitude: this.state.markers[0].location.latitude,
         longitude: this.state.markers[0].location.longitude
       },
       zoom: 15,
       animate: true
    }];
    
    return (
      <BingMap MapReferenceId="mapDiv"
               BingTheme={true}
               CenterMap= {false}
               enableHighDpi={false}
               initialMapViews={defaultView}
               ShowTraffic={false}
               credentials={YOUR_BING_MAP_API_KEY} >
                {this.state.markers.map((marker, index) => {
                  return (
                    <BingPushpin {...marker} />
                  );
                })}
      </BingMap>
    );
  }
}