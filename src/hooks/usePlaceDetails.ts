import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { placeDetails } from "../api/place";

const usePlaceDetails = () => {
  const { search } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fetch the uniqueId from params');
    const uniqueId: string = JSON.stringify(search);
    if (uniqueId) {
      fetchPlaceDetails(uniqueId)
    }
  }, [])

  /**
   * fetch places with two words
   */
  const { isLoading, error, data, mutate: fetchPlaceDetails } = useMutation('place-details', placeDetails, {
    retry: false
  });

  return {
    loading: isLoading,
    error,
    data
  };
};

export default usePlaceDetails;
