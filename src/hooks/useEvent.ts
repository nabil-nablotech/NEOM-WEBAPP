import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { events } from "../query/search";
import { RootState } from '../store';
import {setEvents, setEventMetaData} from '../store/reducers/searchResultsReducer'

const useEvent = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, events: eventsData} = useSelector((state: RootState) => state.searchResults);
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
    if (eventsData.length <= data?.visits?.meta?.pagination.total) {
      setHasMoreData(true);
      dispatch(setEvents([...data?.visits?.data]));
      dispatch(setEventMetaData(data?.visits?.meta));
    } else {
      setHasMoreData(false);
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
