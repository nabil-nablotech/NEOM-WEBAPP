import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { places } from "../query/places";
import { RootState } from "../store";
import {
  setPlaces,
  setPlaceMetaData,
  setSearchText
} from "../store/reducers/searchResultsReducer";
import {limit} from '../utils/services/helpers';

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
    const searchParams = decodeURIComponent(search).replace('?', '');
    
    if (searchParams.length > 2) {
      dispatch(setSearchText(JSON.parse(searchParams).search))
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
    const text = local ? searchText : decodeURIComponent(search.replace("?search=", ""));
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    // console.log('copiedValue', copiedValue)
    const searchParams = new URLSearchParams(copiedValue);
    // console.log(
    //   "decodeURIComponent",
    //   decodeURIComponent(searchParams.toString())
    // );
    const searchWordArray = text.split(" ");
    const obj: any = {
      // researchValue: copiedValue.researchValue ? copiedValue?.researchValue[0] : "",
      // tourismValue: copiedValue.tourismValue ? copiedValue?.tourismValue[0] : "",
      // stateOfConservation: copiedValue.stateOfConservation ? copiedValue?.stateOfConservation[0] : "",
      // recommendation: copiedValue?.recommendation > 0 ? copiedValue?.recommendation[0] : "",
      // risk: copiedValue?.risk[0] || "",
      // period: copiedValue?.period[0] || "",
      // latitude: copiedValue?.latitude,
      // longitude: copiedValue?.longitude,
      // language: Object.keys(copiedValue).length > 0 ? "English" : "",
    };
    if (Object.keys(copiedValue).length > 0) {
      obj.language = "English";
    }
    // console.log('obj', obj);
    refetchPlaces({
      ...obj,
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      limit: limit,
      skip: skip,
    });
    refetchPlaces({
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      limit: limit,
      skip: skip,
    });
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
