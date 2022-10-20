import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapStyles from "./MapStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
};
var URL = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";


const MapView = ({marker}) => {

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
    marker?.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={25}
      options={{ styles: MapStyles.dark }}
      onLoad={handleOnLoad}
      onUnmount={onUnmount}
      onClick={() => setActiveMarker(null)}
    >
      {marker?.map(({id, name, position}) => (
        <Marker
          key={id}
          position={position}
          icon={{
            url: URL,
          }}
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
