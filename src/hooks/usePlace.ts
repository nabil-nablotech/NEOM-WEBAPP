import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { places } from "../query/search";
import { RootState } from "../store";
import {
  setPlaces,
  setPlaceMetaData,
} from "../store/reducers/searchResultsReducer";

const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(true);

  const {
    searchText,
    places: placeData,
    placeMetaData,
  } = useSelector((state: RootState) => state.searchResults);
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    resetPlaces();
    fetchData(0);
  }, []);

  const resetPlaces = async () => {
    await dispatch(setPlaces([]));
    await dispatch(setPlaceMetaData(null));
  };

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch: refetchPlaces } = useQuery(places);

  useEffect(() => {
    if (data?.places) {
      // update the data for the pagination
      if (data?.places.meta.pagination.page === 1 && data?.places.data.length > 0) {
        dispatch(setPlaces([...data?.places.data]));
      } else if (data?.places.data.length > 0) {
        dispatch(setPlaces([...placeData, ...data?.places.data]));
      }
      // update the meta data
      dispatch(setPlaceMetaData(data?.places?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(data?.places?.meta.pagination.pageCount !==
        data?.places.meta.pagination.page);

    }
  }, [data]);

  console.log('has more data in hooks', hasMoreData);

  const fetchData = (skip: number = placeData.length, local: boolean = false) => {
    const text = local ? searchText : decodeURIComponent(search.replace("?search=", ""));
    refetchPlaces({ search_one: text, limit: 5, skip: skip });
  };

  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchPlaces: fetchData,
  };
};

export default usePlace;
