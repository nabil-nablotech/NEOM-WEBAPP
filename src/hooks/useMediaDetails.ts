import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { mediaDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { MediaApi } from "../types/Media";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";
import { MEDIA_TAB_NAME } from '../utils/services/helpers';
import { toggleNewItemWindow, setAddNewItemWindowType, setDefaultMediaAssociation, toggleEditConfirmationWindowOpen, toggleConfirmOpenEdit, setEditPayload } from "../store/reducers/searchResultsReducer";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useMediaDetails = () => {
  const { search } = useLocation();
  const { uniqueId } = useParams<{ uniqueId: string }>()
  const { addNewItemWindowType, confirmOpenEdit, editPayload} = useSelector((state: RootState) => state.searchResults);

  const dispatch = useDispatch();

  useEffect(() => {
    if (uniqueId) {
      fetchMediaDetails(uniqueId)
    }
  }, [uniqueId])

  /**
   * fetch places with two words
   */
  const { isLoading, error, data, mutate: fetchMediaDetails } = useMutation('place-details', mediaDetails, {
    retry: false
  });

  
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

      res = await mediaDetails(record.uniqueId);
      if (res?.media_associate) {
        dispatch(setDefaultMediaAssociation({ events: res.media_associate?.visit_unique_ids || [], places: res.media_associate?.place_unique_ids || [] }));
      }
      dispatch(setTabData(res));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true));
      dispatch(setAddNewItemWindowType(MEDIA_TAB_NAME));
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
    setEdit
  };
};

export default useMediaDetails;
