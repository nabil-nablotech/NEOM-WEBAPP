import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { places, refinePlaces } from "../query/places";
import { RootState } from "../store";
import { initialSelectedValue, setSelectedValue } from "../store/reducers/refinedSearchReducer";
import {
  setPlaces,
  setPlaceMetaData,
  setSearchText
} from "../store/reducers/searchResultsReducer";

import {limit, getQueryObj} from '../utils/services/helpers';

const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [mapPlaces, setMapPlaces] = useState([]);
  const { searchText, places: placeData } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { selectedValue } = useSelector(
    (state: RootState) => state.refinedSearch
  );
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchData = getQueryObj(search);
    if (searchData) {
      dispatch(setSearchText(searchData.search))
      if (searchData.refinedSearch) {
        dispatch(setSelectedValue({
          ...initialSelectedValue,
          ...searchData.refinedSearch
        }))
      }
    }
    resetPlaces();
    fetchData(0);
  }, []);

  const resetPlaces = async () => {
    await dispatch(setPlaces([]));
    await dispatch(setPlaceMetaData(null));
  };

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch: refetchPlaces } = useQuery(places);
  const [refineSearchPlaces, { loading:refineLoading, error:refineErrorData, data:refinePlaceData}] = useMutation(refinePlaces);

  useEffect(() => {
    if (data?.places) {
      // update the data for the pagination
      if (data?.places.meta.pagination.page === 1 && data?.places.data.length > 0) {
        dispatch(setPlaces([...data?.places.data]));
      } else if (data?.places.data.length > 0) {
        dispatch(setPlaces([...placeData, ...data?.places.data]));
      }
      // update the meta data
      dispatch(setPlaceMetaData(data?.places?.meta));
      // this flag decides to fetch next set of data
      setHasMoreData(
        data?.places?.meta.pagination.pageCount !==
          data?.places.meta.pagination.page
      );

      let dummyArray: any = [];
      for (let i = 0; i < data?.places?.data?.length; i++) {
        dummyArray.push({
          id: i,
          name: data?.places?.data[i].attributes["placeNameEnglish"],
          position: {
            lat: data?.places?.data[i].attributes["latitude"],
            lng: data?.places?.data[i].attributes["longitude"],
          },
        });
      }
      setMapPlaces(dummyArray);
    }
  }, [data]);

  useEffect(() => {
    if (refinePlaceData?.places) {
      // update the data for the pagination
      if (refinePlaceData?.places.meta.pagination.page === 1 && refinePlaceData?.places.data.length > 0) {
        dispatch(setPlaces([...refinePlaceData?.places.data]));
      } else if (refinePlaceData?.places.data.length > 0) {
        dispatch(setPlaces([...placeData, ...refinePlaceData?.places.data]));
      }
      // update the meta data
      dispatch(setPlaceMetaData(refinePlaceData?.places?.meta));
      // this flag decides to fetch next set of data
      setHasMoreData(
        refinePlaceData?.places?.meta.pagination.pageCount !==
        refinePlaceData?.places.meta.pagination.page
      );

      let dummyArray: any = [];
      for (let i = 0; i < data?.places?.data?.length; i++) {
        dummyArray.push({
          id: i,
          name: data?.places?.data[i].attributes["placeNameEnglish"],
          position: {
            lat: data?.places?.data[i].attributes["latitude"],
            lng: data?.places?.data[i].attributes["longitude"],
          },
        });
      }
      setMapPlaces(dummyArray);
    }
  }, [refinePlaceData]);

  const fetchData = (skip: number = placeData.length, local: boolean = false, clear: boolean = false) => {
    // get the query from the url parameters
    const searchData = getQueryObj(search);
    // check if the search is coming from local or using link
    const text = local ? searchText : searchData?.search;
    // filter non data from the array object
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    const searchWordArray = text?.split(" ") || [];
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
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      limit: limit,
      skip: skip,
    };
    if (clear) {
      obj.skip = 0;
      obj.search_one = '';
      delete obj.search_two;
      delete obj.search_three;
      refineSearchPlaces(obj)
    }
    else if(Object.keys(copiedValue).length !== 0){
      refineSearchPlaces(obj)
    }else{
      refetchPlaces({
        search_one: searchWordArray[0] || '',
        search_two: searchWordArray[1],
        search_three: searchWordArray[2],
        limit: limit,
        skip: skip,
      });
    }
  };

  const clearTextSearch = () => {
    fetchData(0, true, true);
  }

  return {
    loading: loading || refineLoading,
    error: error || refineErrorData,
    data,
    mapPlaces,
    hasMoreData,
    fetchPlaces: fetchData,
    clearSearch: clearTextSearch
  };
};

export default usePlace;
