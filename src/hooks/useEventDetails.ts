import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { eventDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";

const useEventDetails = () => {
  let { uniqueId } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();

  useEffect(() => {
    if (uniqueId) {
      fetchEventDetails(uniqueId)
    }
  }, [])

  /**
   * fetch places with two words
   */
  const { isLoading, error, data, mutate: fetchEventDetails } = useMutation('event-details', eventDetails, {
    retry: false
  });

  return {
    loading: isLoading,
    error,
    data
  };
};

export default useEventDetails;
