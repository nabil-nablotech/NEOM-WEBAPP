import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { addEvent, refineEvents } from "../query/events";
import { createVisitAssociate } from "../query/eventAssociate";
import { RootState } from "../store";
import { setSelectedValue, initialSelectedValue } from "../store/reducers/refinedSearchReducer";
import {
  setEvents,
  setEventMetaData,
  setSearchText
} from "../store/reducers/searchResultsReducer";
import {limit, getQueryObj, generateUniqueId, webUrl} from '../utils/services/helpers';
import { tabNameProps } from "../types/SearchResultsTabsProps";
import { AddEventState } from "../store/reducers/eventReducer";
import { graphQlHeaders } from "../utils/services/interceptor";

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
  
  let { tabName } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
  const dispatch = useDispatch();

  const searchParams = getQueryObj(search);
  useEffect(() => {
    if (searchParams) {
      dispatch(setSearchText(searchParams.search))
      if (searchParams?.refinedSearch) {
        dispatch(setSelectedValue({
          ...initialSelectedValue,
          ...searchParams.refinedSearch
        }))
      }
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
  const [createEventMuation, { loading, error, data }] = useMutation(addEvent, graphQlHeaders());
  const [createVisitAssociateMuation, { loading: visitAssociateload, error: visitAssociateErr, data: visitAssociate }] = useMutation(createVisitAssociate, graphQlHeaders());
  const{ loading:refineLoading, error:refineErrorData, data:refineEventData, refetch:refineSearchEvents} = useQuery(refineEvents);

 
  useEffect(() => {
    if (refineEventData?.visits) {
      // update the data for the pagination
      if (refineEventData?.visits.meta.pagination.page === 1 && refineEventData?.visits.data.length > 0) {
        dispatch(setEvents([...refineEventData?.visits?.data]));
      } else if (refineEventData?.visits.data.length > 0) {
        dispatch(setEvents([...eventsData, ...refineEventData?.visits?.data]));
      }  else if (refineEventData?.visits?.meta.pagination.total === 0) {
        dispatch(setEvents([]));
      }
      // update the meta data
      dispatch(setEventMetaData(refineEventData?.visits?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(refineEventData?.visits?.meta.pagination.pageCount !==
        refineEventData?.visits.meta.pagination.page);

        let dummyArray:any = [];
        for (let i = 0; i < refineEventData?.visits?.data?.length; i++) {
            if (refineEventData?.visits?.data[i]?.attributes?.latitude && refineEventData?.visits?.data[i]?.attributes?.longitude) dummyArray.push({id:i,name:refineEventData?.visits?.data[i].attributes['recordingTeam'],position:{lat:refineEventData?.visits?.data[i]?.attributes?.latitude,lng:refineEventData?.visits?.data[i]?.attributes?.longitude}})
        }
          setMapEvents(dummyArray)
    }

  }, [refineEventData]);

  useEffect(() => {
    if (data) {
      console.log('data in create event', data)
      createVisitAssociateMuation({variables: {
        "place_unique_id": 1,
        "visit_unique_id": data.createVisit.data.id
      }})
    }
  }, [data])

  useEffect(() => {
    if (visitAssociate) {
      fetchData(0);
    }
  }, [visitAssociate])

  const fetchData = (skip: number = eventsData.length, local: boolean = false, clear: boolean = false) => {
    const searchData = getQueryObj(search);
    const text = local ? searchText : searchData?.search;
    const copiedValue = local ? JSON.parse(JSON.stringify(selectedValue)) : searchData?.refinedSearch;
    
    const searchWordArray = text?.split(' ') || [];
    copiedValue && Object.keys(copiedValue)?.map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });

    const startDate = new Date(copiedValue?.startDate);
    const visitStartDate = (copiedValue?.startDate && startDate?.getFullYear()) ? `${startDate?.getFullYear()}-${startDate?.getMonth() + 1}-${startDate?.getDate()}` : undefined;
    const endDate = new Date(copiedValue?.endDate);
    const visitEndDate = (copiedValue?.endDate && endDate?.getFullYear()) ? `${endDate?.getFullYear()}-${endDate?.getMonth() + 1}-${endDate?.getDate()}` : undefined;
    
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
      startDate: visitStartDate && visitStartDate,
      endDate: visitEndDate && visitEndDate,      
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      text: searchWordArray,
      limit: limit,
      skip: skip,
    };
    if (clear) {
      obj.skip = 0;
      obj.search_one = '';
      delete obj.search_two;
      delete obj.search_three;
      delete obj.text;
      refineSearchEvents(obj)
    }
    else { 
      refineSearchEvents(obj)
    }
  };

  const clearTextSearch = () => {
    fetchData(0, true, true);
  }

  function zerofill(i: number) {
    return (i < 10 ? '0' : '') + i;
}
  const createEvent = async (payload: any | undefined) => {
    const uniqueId = generateUniqueId();
    const keywords = payload.keywords?.split(' ');
    const eventDate = payload.eventDate;
    const visitDate = `${eventDate.getFullYear()}-${zerofill(eventDate.getMonth() + 1)}-${zerofill(eventDate.getDate())}`;
    const data = {
      ...payload,
      uniqueId: uniqueId,
      visitNumber: 1,
      visitUIPath: `${webUrl}/search-results/Events/${uniqueId}`,
      asset_config_id: 1,
      keywords: keywords,
      siteType: payload.siteType && [payload.siteType],
      visitDate: visitDate,
      "researchValue": payload.researchValue && [payload.researchValue],
      "tourismValue": payload.tourismValue && [payload.tourismValue],
      "stateOfConservation": payload.stateOfConservation && [payload.stateOfConservation],
      "recommendation": payload.recommendation && [payload.recommendation],
      "risk": payload.risk && [payload.risk],
      "period": payload.period && payload.period,
      "latitude": payload.latitude && parseFloat(payload.latitude),
      "longitude": payload.longitude && parseFloat(payload.longitude),
      "assessmentType": payload.assessmentType && [payload.assessmentType],
      artifacts: payload.artifacts && [payload.artifacts]
    }
    console.log('data.....', data);
    createEventMuation({variables: data})
  }

  return {
    loading: refineLoading,
    error: refineErrorData,
    data: refineEventData,
    mapEvents,
    hasMoreData,
    fetchEvents: fetchData,
    clearSearch: clearTextSearch,
    createEvent: createEvent
  };
};

export default useEvent;
