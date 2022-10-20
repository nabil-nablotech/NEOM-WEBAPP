import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { events } from "../query/events";
import { RootState } from "../store";
import {
  setEvents,
  setEventMetaData,
} from "../store/reducers/searchResultsReducer";
import {limit} from '../utils/services/helpers';

const useEvent = () => {
  const [hasMoreData, setHasMoreData] = useState(true);

  const {
    searchText,
    events: eventsData,
  } = useSelector((state: RootState) => state.searchResults);
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    resetEvents();
    fetchData(0);
  }, []);

  const resetEvents = async () => {
    await dispatch(setEvents([]));
    await dispatch(setEventMetaData(null));
  };

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch: refetchEvents } = useQuery(events);

  useEffect(() => {
    if (data?.visits) {
      // update the data for the pagination
      if (data?.visits.meta.pagination.page === 1 && data?.visits.data.length > 0) {
        dispatch(setEvents([...data?.visits?.data]));
      } else if (data?.visits.data.length > 0) {
        dispatch(setEvents([...eventsData, ...data?.visits?.data]));
      }
      // update the meta data
      dispatch(setEventMetaData(data?.visits?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(data?.visits?.meta.pagination.pageCount !==
        data?.visits.meta.pagination.page);
    }

  }, [data]);

  const fetchData = (skip: number = eventsData.length, local: boolean = false) => {
    const text = local ? searchText : decodeURIComponent(search.replace("?search=", ""));
    const searchWordArray = text.split(' ');
    refetchEvents({ search_one: searchWordArray[0], search_two: searchWordArray[1], search_three: searchWordArray[2], limit: limit, skip: skip });
  };

  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchEvents: fetchData,
  };
};

export default useEvent;
