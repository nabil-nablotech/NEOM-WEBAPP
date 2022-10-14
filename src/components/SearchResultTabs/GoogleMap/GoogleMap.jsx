import { useLoadScript } from "@react-google-maps/api";
import MapView from "./MapView";

const GoogleMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDk4YMVQbv85GukMcQqveKZnwp9AXqQ8Og",
  });
  return isLoaded ? <MapView /> : null;
};

export default GoogleMap;
