import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { events, refineEvents } from "../query/events";
import { RootState } from "../store";
import { setSelectedValue, initialSelectedValue } from "../store/reducers/refinedSearchReducer";
import {
  setEvents,
  setEventMetaData,
} from "../store/reducers/searchResultsReducer";
import {limit, getQueryObj} from '../utils/services/helpers';

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
    const searchParams = getQueryObj(search);
    if (searchParams?.refinedSearch) {
      dispatch(setSelectedValue({
        ...initialSelectedValue,
        ...searchParams.refinedSearch
      }))
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
  const[refineSearchEvents, { loading:refineLoading, error:refineErrorData, data:refineEventData}] = useMutation(refineEvents);

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
  
  useEffect(() => {
    if (refineEventData?.visits) {
      // update the data for the pagination
      if (refineEventData?.visits.meta.pagination.page === 1 && refineEventData?.visits.data.length > 0) {
        dispatch(setEvents([...refineEventData?.visits?.data]));
      } else if (refineEventData?.visits.data.length > 0) {
        dispatch(setEvents([...eventsData, ...refineEventData?.visits?.data]));
      } else if (refineEventData?.visits.data.length === 0) {
        dispatch(setEvents(refineEventData?.visits?.data));
      }
      // update the meta data
      dispatch(setEventMetaData(refineEventData?.visits?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(refineEventData?.visits?.meta.pagination.pageCount !==
        refineEventData?.visits.meta.pagination.page);

        let dummyArray:any = [];
        for (let i = 0; i < refineEventData?.visits?.data?.length; i++) {
            dummyArray.push({id:i,name:refineEventData?.visits?.data[i].attributes['recordingTeam'],position:{lat:refineEventData?.visits?.data[i].attributes['latitude'],lng:refineEventData?.visits?.data[i].attributes['longitude']}})
        }
          setMapEvents(dummyArray)
    }

  }, [refineEventData]);

  const fetchData = (skip: number = eventsData.length, local: boolean = false) => {
    const searchData = getQueryObj(search);
    console.log('search', searchData);
    const text = local ? searchText : searchData?.search;
    const searchWordArray = text?.split(' ') || [];
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    console.log('copiedValue', )
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    const obj: any = {
      researchValue: copiedValue&&copiedValue?.researchValue && copiedValue?.researchValue,
      tourismValue: copiedValue&&copiedValue.tourismValue && copiedValue?.tourismValue,
      stateOfConservation: copiedValue&&copiedValue?.stateOfConservation && copiedValue?.stateOfConservation,
      recommendation: copiedValue&&copiedValue?.recommendation && copiedValue?.recommendation,
      risk: copiedValue&&copiedValue?.risk && copiedValue?.risk,
      period: copiedValue&&copiedValue?.period && copiedValue?.period,
      latitude: copiedValue&&copiedValue?.latitude && parseFloat(copiedValue?.latitude),
      longitude: copiedValue&&copiedValue?.longitude && parseFloat(copiedValue?.longitude),
      artifacts: copiedValue&&copiedValue?.artifacts && copiedValue?.artifacts,
      assessmentType: copiedValue&&copiedValue?.assessmentType && copiedValue?.assessmentType,
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
