import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { mediaDetails, placeDetails } from "../api/details";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";
import { PLACES_TAB_NAME } from "../utils/services/helpers";
import { toggleNewItemWindow, setAddNewItemWindowType } from "../store/reducers/searchResultsReducer";
import { RootState } from "../store";
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { PlaceApi, Place } from "../types/Place";
import { Media } from "../types/Media";
import { Event } from "../types/Event";

const usePlaceDetails = () => {
  const { uniqueId } = useParams<{ uniqueId: string }>();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { edit } = useSelector((state:RootState) => state.tabEdit)

  useEffect(() => {
    if (uniqueId) {
      fetchPlaceDetails(uniqueId)
    }
  }, [edit, uniqueId])

  /**
   * fetch places with two words
   */
  const { isLoading, error, data, mutate: fetchPlaceDetails } = useMutation('place-details', placeDetails, {
    retry: false
  });

  const setEdit = async (payload: {record: any, type: tabNameProps}) => {
    if (payload) {
      const {record, type} = payload;
      console.log(payload, 'place details', type);
      let res={};
      if (type === 'Places') {
        res = await placeDetails(record.uniqueId);
      }
      if (type === 'Library' && record.media_unique_id) {
        res = await mediaDetails(record.media_unique_id.uniqueId);
      }
      if (type === 'Events' && record.visit_unique_id) {
        res = await mediaDetails(record.visit_unique_id.uniqueId);
      }
      dispatch(setTabData(res));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true));
      dispatch(setAddNewItemWindowType(type));
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
