import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { libraryDetails } from "../api/details";

const useLibraryDetails = () => {
  const { search } = useLocation();
  const { uniqueId } = useParams<{ uniqueId: string }>()

  const dispatch = useDispatch();

  useEffect(() => {
    if (uniqueId) {
      fetchLibraryDetails(uniqueId)
    }
  }, [])

  /**
   * fetch with two words
   */
  const { isLoading, error, data, mutate: fetchLibraryDetails } = useMutation('place-details', libraryDetails, {
    retry: false
  });

  return {
    loading: isLoading,
    error,
    data
  };
};

export default useLibraryDetails;
