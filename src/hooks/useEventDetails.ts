import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { eventDetails, mediaDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { setEventEdit, setEventData } from "../store/reducers/eventReducer";
import { toggleNewItemWindow, setAddNewItemWindowType, setDefaultMediaAssociation, toggleEditConfirmationWindowOpen, setEditPayload, toggleConfirmOpenEdit } from "../store/reducers/searchResultsReducer";
import { EVENTS_TAB_NAME } from "../utils/services/helpers";
import { RootState } from "../store";
import { MediaApi } from "../types/Media";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";

const useEventDetails = () => {
  let { uniqueId } = useParams<{ tabName?: tabNameProps; uniqueId: string }>();
  const dispatch = useDispatch();
  const { edit } = useSelector((state:RootState) => state.event)
  const { addNewItemWindowType, confirmOpenEdit , editPayload } = useSelector(
    (state: RootState) => state.searchResults
  );

  useEffect(() => {
    if (uniqueId) {
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

  useEffect(() => {
    if (confirmOpenEdit && editPayload) {

      openEditFlow(editPayload)
      dispatch(toggleConfirmOpenEdit(false));
      dispatch(setEditPayload(null));

    }
  }, [confirmOpenEdit])

  const openEditFlow = async (payload: any) => {
    if (payload) {
      const { record, type } = payload;
      let res: any | MediaApi = {};
      if (type === 'Library' && record.media_unique_id) {
        res = await mediaDetails(record.media_unique_id.uniqueId);
        if (res?.media_associate) {
          dispatch(setDefaultMediaAssociation({ events: res.media_associate?.visit_unique_ids || [], places: res.media_associate?.place_unique_ids || [] }));
        }
      }
      if (type === 'Media' && record.media_unique_id) {
        res = await mediaDetails(record.media_unique_id.uniqueId);
        if (res?.media_associate) {
          dispatch(setDefaultMediaAssociation({ events: res.media_associate?.visit_unique_ids || [], places: res.media_associate?.place_unique_ids || [] }));
        }
      }
      if (type === 'Events' && record.uniqueId) {
        res = record;
      }
      dispatch(setTabEdit(true));
      dispatch(setTabData(res));
      dispatch(setEventData(res));
      dispatch(setEventEdit(true));
      dispatch(toggleNewItemWindow(true));
      dispatch(setAddNewItemWindowType(type));
    }
  }


  const setEdit = async (payload: {record: any, type: tabNameProps}) => {
    if (addNewItemWindowType) {
      /** Detect if user comes via forced edit */
        dispatch(toggleEditConfirmationWindowOpen(true));
        dispatch(setEditPayload(payload));

    } else {
      /** Detect if user comes via normal edit */
      openEditFlow(payload)
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
