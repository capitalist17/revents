import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => <Icon name="marker" size="big" color="red" />;

const EventDetailedMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;
  

  return (
    <Segment attached="bottom" style={{padding:0}}>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD9EdV2JfPG1Vfviw9gf_HlblIUfs7Ie2E" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        
        <Marker lat={lat} lng={lng} text='Be here on time'/>
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailedMap;
