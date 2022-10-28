import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { mediaDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";

const useMediaDetails = () => {
  const { search } = useLocation();
  const { uniqueId } = useParams<{ uniqueId: string }>()

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fetch the uniqueId from params');
    if (uniqueId) {
      fetchMediaDetails(uniqueId)
    }
  }, [])

  /**
   * fetch places with two words
   */
  const { isLoading, error, data, mutate: fetchMediaDetails } = useMutation('place-details', mediaDetails, {
    retry: false
  });

  return {
    loading: isLoading,
    error,
    data
  };
};

export default useMediaDetails;
