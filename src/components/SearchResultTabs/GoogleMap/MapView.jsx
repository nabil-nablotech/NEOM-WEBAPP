/*global google*/
import React, { useState, useCallback, useEffect, useRef } from "react";

import {
  GoogleMap,
  InfoWindow,
  Marker
} from "@react-google-maps/api";

const center = {
  lat: 38.909529,
  lng: -77.043441,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};
const options = {
  disableDefaultUI: true,
  gestureHandling: "cooperative",
};

const markers = [
  {
    id: 1,
    name: "Dupont circle",
    position: { lat: 38.909529, lng: -77.043295 },
  },
  {
    id: 2,
    name: "Washington DC Club",
    position: { lat: 38.909875, lng: -77.04245 },
  },
];

const MapView = () => {
  const [centerFirst, setCenterFirst] = useState({
    lat: 38.909529,
    lng: -77.043295,
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
  const [zoom, setZoom] = useState(8);
  
  

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={16}
      onZoomChanged={() => setZoom(mapRef?.current?.getZoom())}
      center={centerFirst}
      options={options}
      onLoad={onMapLoad}
      onClick={() => setActiveMarker(null)}
    >

{/* <Marker
          position={{
            lat: 38.909529,
            lng: -77.043441,
          }}
          animation={window.google.maps.Animation.Qo}
          icon={{url:"https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png",
            scaledSize: new window.google.maps.Size(60,60),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(30,30)
        }}
        >
        </Marker> */}


      {markers&&markers?.map(({ id, name, position }) =>(
        <Marker
          key={id}
          position={position}
          animation={window.google.maps.Animation.Qo}
          icon={{url:"/googleMapMarker.svg",
            scaledSize: new window.google.maps.Size(60,60),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(30,30)
        }}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))
      }
    </GoogleMap>
  );
};

export default MapView;
