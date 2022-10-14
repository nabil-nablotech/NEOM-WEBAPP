import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { events } from "../query/search";
import { RootState } from '../store';

const useEvent = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();

  useEffect(() => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));

    fetchEvents({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchEvents } = useQuery(events);
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchEvents
  };
};

export default useEvent;
