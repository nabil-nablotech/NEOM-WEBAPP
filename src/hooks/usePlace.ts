import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { places } from "../query/search";
import { RootState } from '../store';
import {setPlaces, setPlaceMetaData} from '../store/reducers/searchResultsReducer'

const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));
    fetchPlaces({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchPlaces } = useQuery(places);

  useEffect(() => {
    if (data?.places.meta.pagination.total < 10) {
      setHasMoreData(false);
      dispatch(setPlaces(data?.places.data));
      dispatch(setPlaceMetaData(data?.places?.meta));
    } else {
      setHasMoreData(true);
    }
  }, [data])
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchPlaces
  };
};

export default usePlace;
