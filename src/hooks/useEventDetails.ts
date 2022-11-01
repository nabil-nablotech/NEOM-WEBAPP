import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { eventDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { setEventEdit, setEventData } from "../store/reducers/eventReducer";
import { toggleNewItemWindow, setAddNewItemWindowType } from "../store/reducers/searchResultsReducer";
import { EVENTS_TAB_NAME } from "../utils/services/helpers";

const useEventDetails = () => {
  let { uniqueId } = useParams<{ tabName?: tabNameProps; uniqueId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (uniqueId) {
      fetchEventDetails(uniqueId);
    }
  }, []);

  /**
   * fetch places with two words
   */
  const {
    isLoading,
    error,
    data,
    mutate: fetchEventDetails,
  } = useMutation("event-details", eventDetails, {
    retry: false,
  });

  const setEdit = () => {
    if (data) {
      dispatch(setEventData(data));
      dispatch(setEventEdit(true));
      dispatch(toggleNewItemWindow(true))
      dispatch(setAddNewItemWindowType(EVENTS_TAB_NAME))
    }
  };

  return {
    loading: isLoading,
    error,
    data,
    setEdit,
  };
};

export default useEventDetails;
