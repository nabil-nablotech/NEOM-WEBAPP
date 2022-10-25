import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { places, refinePlaces } from "../query/places";
import { RootState } from "../store";
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
  const { loading:refineLoading, error:refineErrorData, data:refinePlaceData, refetch: refineSearchPlaces } = useQuery(refinePlaces);

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

  const fetchData = (skip: number = placeData.length, local: boolean = false) => {
    const searchData = getQueryObj(search);
    const text = local ? searchText : searchData?.search;
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });

    // const searchParams = new URLSearchParams(copiedValue);
    const searchWordArray = text?.split(" ") || [];
    const obj: any = {
      researchValue: copiedValue&&copiedValue?.researchValue ? copiedValue?.researchValue[0] : "",
      tourismValue: copiedValue&&copiedValue.tourismValue ? copiedValue?.tourismValue[0] : "",
      stateOfConservation: copiedValue&&copiedValue?.stateOfConservation ? copiedValue?.stateOfConservation[0] : "",
      recommendation: copiedValue&&copiedValue?.recommendation > 0 ? copiedValue?.recommendation[0] : "",
      risk: copiedValue&&copiedValue?.risk ? copiedValue?.risk[0]: "",
      period: copiedValue&&copiedValue?.period ? copiedValue?.period[0] : "",
      latitude: copiedValue&&copiedValue?.latitude?parseFloat(copiedValue?.latitude):0,
      longitude: copiedValue&&copiedValue?.longitude?parseFloat(copiedValue?.longitude):0,
      artifacts: copiedValue&&copiedValue?.artifacts ? copiedValue?.artifacts[0] : "",
      search_one: searchWordArray[0] || '',
      search_two: searchWordArray[1] || '',
      search_three: searchWordArray[2] || '',
      limit: limit,
      skip: skip,
    };
    if(Object.keys(copiedValue).length !== 0){
      refineSearchPlaces(obj)
    }else{
      refetchPlaces({
        search_one: searchWordArray[0],
        search_two: searchWordArray[1],
        search_three: searchWordArray[2],
        limit: limit,
        skip: skip,
      });
    }
  };

  return {
    loading,
    error,
    data,
    mapPlaces,
    hasMoreData,
    fetchPlaces: fetchData,
  };
};

export default usePlace;
