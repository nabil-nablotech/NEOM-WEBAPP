import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { placeDetails } from "../api/details";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";
import { PLACES_TAB_NAME } from "../utils/services/helpers";
import { toggleNewItemWindow, setAddNewItemWindowType } from "../store/reducers/searchResultsReducer";
import { RootState } from "../store";

const usePlaceDetails = () => {
  const { search } = useLocation();
  const { uniqueId } = useParams<{ uniqueId: string }>()

  const dispatch = useDispatch();
  const { edit } = useSelector((state:RootState) => state.tabEdit)

  useEffect(() => {
    if (uniqueId && !edit) {
      fetchPlaceDetails(uniqueId)
    }
  }, [edit])

  /**
   * fetch places with two words
   */
  const { isLoading, error, data, mutate: fetchPlaceDetails } = useMutation('place-details', placeDetails, {
    retry: false
  });

  const setEdit = () => {
    if (data) {
      dispatch(setTabData(data));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true))
      dispatch(setAddNewItemWindowType(PLACES_TAB_NAME))
    }
  };

  return {
    loading: isLoading,
    error,
    data,
    setEdit
  };
};

export default usePlaceDetails;
