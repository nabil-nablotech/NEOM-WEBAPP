import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { places } from "../query/search";
import { RootState } from '../store';

const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();

  useEffect(() => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));

    fetchPlaces({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchPlaces } = useQuery(places);
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchPlaces
  };
};

export default usePlace;
