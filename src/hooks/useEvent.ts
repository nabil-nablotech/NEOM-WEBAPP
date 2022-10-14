import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { events } from "../query/search";
import { RootState } from '../store';
import {setEvents, setMetaData} from '../store/reducers/searchResultsReducer'

const useEvent = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const text = searchText.toLowerCase() || decodeURIComponent(search.replace('?search=', '')).toLowerCase();

    fetchEvents({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchEvents } = useQuery(events);

  useEffect(() => {
    if (data?.places.meta.pagination.total < 10) {
      setHasMoreData(false);
      dispatch(setEvents(data?.places?.data));
      dispatch(setMetaData(data?.places?.meta));
    } else {
      setHasMoreData(true);
    }
  }, [data])
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchEvents
  };
};

export default useEvent;
