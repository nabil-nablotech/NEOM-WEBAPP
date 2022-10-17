import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { places } from "../query/search";
import { RootState } from '../store';
import {setPlaces, setPlaceMetaData} from '../store/reducers/searchResultsReducer'

const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, places: placeData} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));
    // const splitText = text.split('');
    fetchPlaces({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchPlaces } = useQuery(places);

  useEffect(() => {
    if (data?.places.meta.pagination.pageCount !== data?.places.meta.pagination.page) {
      // const oldPlaces = placeData;
      setHasMoreData(true);
      dispatch(setPlaces([...placeData, ...data?.places.data]));
      dispatch(setPlaceMetaData(data?.places?.meta));
    } else {
      setHasMoreData(false);
    }
  }, [data]);
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchPlaces
  };
};

export default usePlace;
