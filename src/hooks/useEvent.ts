import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { events } from "../query/search";
import { RootState } from "../store";
import {
  setEvents,
  setEventMetaData,
} from "../store/reducers/searchResultsReducer";

const useEvent = () => {
  const [hasMoreData, setHasMoreData] = useState(true);

  const {
    searchText,
    events: eventsData,
    eventMetaData,
  } = useSelector((state: RootState) => state.searchResults);
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('inside effect');
    resetPlaces();
  }, []);

  const resetPlaces = async () => {
    await dispatch(setEvents([]));
    await dispatch(setEventMetaData(null));
    await fetchData(0);
  };

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch: refetchEvents } = useQuery(events);

  useEffect(() => {
    if (data?.visits) {
      // const oldPlaces = placeData;

      if (
        eventMetaData?.pagination.pageCount !==
          data?.visits.meta.pagination.page &&
        hasMoreData
      ) {
        dispatch(setEvents([...eventsData, ...data?.visits?.data]));
        setHasMoreData(true);
        dispatch(setEventMetaData(data?.visits?.meta));
      } else if (
        eventMetaData?.pagination.pageCount ===
        data?.visits.meta.pagination.page
      ) {
        dispatch(setEvents([...eventsData, ...data?.visits?.data]));
        dispatch(setEventMetaData(data?.visits?.meta));
        setHasMoreData(false);
      }
    }
  }, [data]);

  const fetchData = (skip: number = eventsData.length) => {
    const text =
      searchText || decodeURIComponent(search.replace("?search=", ""));
    // const splitText = text.split('');
    refetchEvents({ search_one: text || "", limit: 5, skip: skip });
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
