import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { libraryDetails } from "../api/details";
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { MediaApi } from "../types/Media";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";
import { LIBRARY_TAB_NAME } from '../utils/services/helpers';
import { toggleNewItemWindow, setAddNewItemWindowType, setDefaultMediaAssociation } from "../store/reducers/searchResultsReducer";



const useLibraryDetails = () => {
  const { search } = useLocation();
  const { uniqueId } = useParams<{ uniqueId: string }>()

  const dispatch = useDispatch();

  useEffect(() => {
    if (uniqueId) {
      fetchLibraryDetails(uniqueId)
    }
  }, [uniqueId])

  /**
   * fetch with two words
   */
  const { isLoading, error, data, mutate: fetchLibraryDetails } = useMutation('place-details', libraryDetails, {
    retry: false
  });

  const setEdit = async (payload: {record: any, type: tabNameProps}) => {
    if (payload) {
      const {record, type} = payload;
      let res: any | MediaApi={};

      res = await libraryDetails(record.uniqueId);
      if (res?.media_associate) {
        dispatch(setDefaultMediaAssociation({events: res.media_associate?.visit_unique_ids || [], places: res.media_associate?.place_unique_ids || [] }));
      }
      dispatch(setTabData(res));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true));
      dispatch(setAddNewItemWindowType(LIBRARY_TAB_NAME));
    }
  };

  return {
    loading: isLoading,
    error,
    data,
    setEdit
  };
};

export default useLibraryDetails;
