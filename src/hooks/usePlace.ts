import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { places } from "../query/search";
import { RootState } from '../store';
import {setPlaces, setPlaceMetaData} from '../store/reducers/searchResultsReducer'

const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(true);

  const {searchText, places: placeData,placeMetaData} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    resetPlaces();
  }, []);

  const resetPlaces = async () => {
    await dispatch(setPlaces([]));
    await dispatch(setPlaceMetaData(null));
    fetchData(0);
  }

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:refetchPlaces } = useQuery(places);

  useEffect(() => {
    if (data?.places) {
      // const oldPlaces = placeData;

      if (placeMetaData?.pagination.pageCount !== data?.places.meta.pagination.page && hasMoreData) {
        dispatch(setPlaces([...placeData, ...data?.places.data]));
        setHasMoreData(true);
        dispatch(setPlaceMetaData(data?.places?.meta));
     } else if (placeMetaData?.pagination.pageCount === data?.places.meta.pagination.page) {
      dispatch(setPlaces([...placeData, ...data?.places.data]));
      dispatch(setPlaceMetaData(data?.places?.meta));
      setHasMoreData(false);
    }}
  }, [data]);

  const fetchData = (skip: number = placeData.length) => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));
    // const splitText = text.split('');
    refetchPlaces({search_one: text, limit: 2, skip: skip});
  }
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchPlaces: fetchData
  };
};

export default usePlace;
