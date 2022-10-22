import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { events, refineEvents } from "../query/events";
import { RootState } from "../store";
import {
  setEvents,
  setEventMetaData,
  setSearchText,
} from "../store/reducers/searchResultsReducer";
import {limit} from '../utils/services/helpers';

const useEvent = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [mapEvents, setMapEvents]= useState(null);
  const {
    searchText,
    events: eventsData,
  } = useSelector((state: RootState) => state.searchResults);
  const { selectedValue } = useSelector(
    (state: RootState) => state.refinedSearch
  );
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = decodeURIComponent(search).replace('?search=', '');
    if (searchParams.length > 2) {
      dispatch(setSearchText(searchParams))
    }
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
  const { loading:refineLoading, error:refineErrorData, data:refineEventData, refetch: refineSearchEvents } = useQuery(refineEvents);

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

        let dummyArray:any = [];
        for (let i = 0; i < data?.visits?.data?.length; i++) {
            dummyArray.push({id:i,name:data?.visits?.data[i].attributes['recordingTeam'],position:{lat:data?.visits?.data[i].attributes['latitude'],lng:data?.visits?.data[i].attributes['longitude']}})
        }
          setMapEvents(dummyArray)
    }

  }, [data]);

  const fetchData = (skip: number = eventsData.length, local: boolean = false) => {
    const text = local ? searchText : decodeURIComponent(search.replace("?search=", ""));
    const searchWordArray = text.split(' ');
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    const obj: any = {
      researchValue: copiedValue&&copiedValue?.researchValue ? copiedValue?.researchValue[0] : "",
      tourismValue: copiedValue&&copiedValue.tourismValue ? copiedValue?.tourismValue[0] : "",
      stateOfConservation: copiedValue&&copiedValue?.stateOfConservation ? copiedValue?.stateOfConservation[0] : "",
      recommendation: copiedValue&&copiedValue?.recommendation ? copiedValue?.recommendation[0] : "",
      risk: copiedValue&&copiedValue?.risk ? copiedValue?.risk[0]: "",
      period: copiedValue&&copiedValue?.period ? copiedValue?.period[0] : "",
      latitude: copiedValue&&copiedValue?.latitude?parseFloat(copiedValue?.latitude):0,
      longitude: copiedValue&&copiedValue?.longitude?parseFloat(copiedValue?.longitude):0,
      artifacts: copiedValue&&copiedValue?.artifacts ? copiedValue?.artifacts[0] : "",
      assessmentType: copiedValue&&copiedValue?.assessmentType ? copiedValue?.assessmentType[0] : "",
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      limit: limit,
      skip: skip,
    };
    if(Object.keys(copiedValue).length !== 0){
      refineSearchEvents(obj)
    }else{
      refetchEvents({ search_one: searchWordArray[0], search_two: searchWordArray[1], search_three: searchWordArray[2], limit: limit, skip: skip });
    }
  };

  return {
    loading,
    error,
    data,
    mapEvents,
    hasMoreData,
    fetchEvents: fetchData,
  };
};

export default useEvent;
