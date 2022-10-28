import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { placeDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";

const usePlaceDetails = () => {
  const { search } = useLocation();
  const { uniqueId } = useParams<{ uniqueId: string }>()

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fetch the uniqueId from params');
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
