import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const markers = [
  {
    id: 1,
    name: "Qisarah Valley South side",
    position: { lat: 28.453, lng: 34.80304 },
  },
  {
    id: 2,
    name: "Birkat Aynuna",
    position: { lat: 28.0750570169998, lng: 35.177560989 },
  },
  {
    id: 3,
    name:"Qantarat Aynuna",
    position: { lat: 28.077201, lng: 35.177896 },
  },
  {
    id: 4,
    name: "Aynuna",
    position: { lat: 28.089352, lng: 35.185602 },
  },
  {
    id: 5,
    name: "Aynuna",
    position: { lat: 28.089992, lng: 35.183237 },
  },
  {
    id: 6,
    name: "Aynuna",
    position: { lat: 28.090908, lng: 35.182105 },
  },
  {
    id: 7,
    name: "Aynuna",
    position: { lat: 28.091231, lng: 35.179979 },
  },
  {
    id: 8,
    name: "Aynounah",
    position: { lat: 28.091697, lng: 35.180255 },
  },
  {
    id: 9,
    name: "Aynounah",
    position: { lat: 28.092323, lng: 35.180453 },
  },
  {
    id: 10,
    name: "Aynounah",
    position: { lat: 28.0924, lng: 35.181702 },
  },
  {
    id: 11,
    name: "Al-Muwaylih",
    position: { lat: 27.683058, lng: 35.476693 },
  },
  {
    id: 12,
    name: "Al-Muwaylih",
    position: { lat: 27.683031, lng: 35.477065 },
  },
];

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDk4YMVQbv85GukMcQqveKZnwp9AXqQ8Og",
  });
  // eslint-disable-next-line
  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={16}
      onLoad={handleOnLoad}
      onUnmount={onUnmount}
      onClick={() => setActiveMarker(null)}
    >
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapView;
