import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { eventDetails, mediaDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { setEventEdit, setEventData } from "../store/reducers/eventReducer";
import { toggleNewItemWindow, setAddNewItemWindowType, setDefaultMediaAssociation } from "../store/reducers/searchResultsReducer";
import { EVENTS_TAB_NAME } from "../utils/services/helpers";
import { RootState } from "../store";
import { MediaApi } from "../types/Media";

const useEventDetails = () => {
  let { uniqueId } = useParams<{ tabName?: tabNameProps; uniqueId: string }>();
  const dispatch = useDispatch();
  const { edit } = useSelector((state:RootState) => state.event)

  useEffect(() => {
    if (uniqueId && !edit) {
      fetchEventDetails(uniqueId);
    }
  }, [edit]);

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

  // const setEdit = () => {
  //   if (data) {
  //     dispatch(setEventData(data));
  //     dispatch(setEventEdit(true));
  //     dispatch(toggleNewItemWindow(true))
  //     dispatch(setAddNewItemWindowType(EVENTS_TAB_NAME))
  //   }
  // };

  const setEdit = async (payload: {record: any, type: tabNameProps}) => {
    if (payload) {
      const {record, type} = payload;
      let res: any | MediaApi={};
      if (type === 'Library' && record.media_unique_id) {
        res = await mediaDetails(record.media_unique_id.uniqueId);
        if (res?.media_associate) {
          dispatch(setDefaultMediaAssociation({events: res.media_associate?.visit_unique_ids || [], places: res.media_associate?.place_unique_ids || [] }));
        }
      }
      if (type === 'Events' && record.uniqueId) {
        res = record;
      }
      dispatch(setEventData(res));
      dispatch(setEventEdit(true));
      dispatch(toggleNewItemWindow(true));
      dispatch(setAddNewItemWindowType(type));
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
