import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { placeDetails } from "../api/details";
import { addPlace, refinePlaces, updatePlace } from "../query/places";
import { RootState } from "../store";
import { initialSelectedValue, setSelectedValue } from "../store/reducers/refinedSearchReducer";
import {
  setPlaces,
  setPlaceMetaData,
  setSearchText,
  toggleShowAddSuccess,
  toggleNewItemWindow, setAddNewItemWindowType, toggleShowEditSuccess, toggleEditConfirmationWindowOpen, setEditPayload, toggleConfirmOpenEdit
} from "../store/reducers/searchResultsReducer";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";
import { Place } from "../types/Place";
import { tabNameProps } from "../types/SearchResultsTabsProps";

import {limit, getQueryObj, generateUniqueId, webUrl, PLACES_TAB_NAME} from '../utils/services/helpers';
import {graphQlHeaders} from '../utils/services/interceptor';


const usePlace = () => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [mapPlaces, setMapPlaces] = useState([]);
  const { searchText, places: placeData, addNewItemWindowType, confirmOpenEdit, editPayload } = useSelector(
    (state: RootState) => state.searchResults
  );
  const { selectedValue } = useSelector(
    (state: RootState) => state.refinedSearch
  );

  const { edit, tabData } = useSelector(
    (state: RootState) => state.tabEdit
  );

  const { search } = useLocation();
  let { tabName } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchData = getQueryObj(search);
  useEffect(() => {
    if (searchData) {
      dispatch(setSearchText(searchData.search))
      if (searchData?.refinedSearch) {
        dispatch(setSelectedValue({
          ...initialSelectedValue,
          ...searchData.refinedSearch
        }))
      }
    }
    resetPlaces();
    // if (tabName === "Places") {
    fetchData(0);
    // }
  }, []);

  const resetPlaces = async () => {
    await dispatch(setPlaces([]));
    await dispatch(setPlaceMetaData(null));
  };

  /**
   * fetch places with two words
   */
  const { loading:refineLoading, error:refineErrorData, data:refinePlaceData, refetch:refineSearchPlaces} = useQuery(refinePlaces, graphQlHeaders());

  const [createPlaceMutation, {data, loading, error}] = useMutation(addPlace, graphQlHeaders());
  const [updatePlaceMutation, {data: updateData, loading: updateLoading, error: updateErr}] = useMutation(updatePlace, graphQlHeaders());

  useEffect(() => {
    if (refinePlaceData?.places) {
      const places = JSON.parse(JSON.stringify(refinePlaceData?.places.data))

      places.map((x: Place) => {
        x.label = `${x?.attributes?.placeNameEnglish}${x?.attributes?.placeNameArabic}` || '';
        x.value = x?.id;
        return x;
      })

      // update the data for the pagination
      if (refinePlaceData?.places?.meta.pagination.page === 1 && refinePlaceData?.places?.data.length > 0) {
        dispatch(setPlaces([...places]));
      } else if (places?.length > 0) {
        dispatch(setPlaces([...placeData, ...places]));
      } else if (refinePlaceData?.places?.meta.pagination.total === 0) {
        dispatch(setPlaces([]));
      }
      // update the meta data
      dispatch(setPlaceMetaData(refinePlaceData?.places?.meta));
      // this flag decides to fetch next set of data
      setHasMoreData(
        refinePlaceData?.places?.meta.pagination.pageCount !==
        refinePlaceData?.places.meta.pagination.page
      );

      let dummyArray: any = [];
      for (let i = 0; i < refinePlaceData?.places?.data?.length; i++) {
        if (refinePlaceData?.places?.data[i]?.attributes?.latitude && refinePlaceData?.places?.data[i]?.attributes?.longitude) {
          dummyArray.push({
            id:refinePlaceData?.places?.data[i].id,
            name: refinePlaceData?.places?.data[i].attributes["placeNameEnglish"],
            position: {
              lat: refinePlaceData?.places?.data[i].attributes["latitude"],
              lng: refinePlaceData?.places?.data[i].attributes["longitude"],
            },
          });
        }

      }
      setMapPlaces(dummyArray);
    }
  }, [refinePlaceData]);

  useEffect(() => {
    if (data) {
      fetchData(0);
      // dispatch(toggleShowAddSuccess(true))

      /** rdirect */
      navigate(`/search-results/Places/${data.createPlace.data.attributes.uniqueId}`, {replace: true})
      /** insert in reducer */
      /** map that to screen  */
    }
  }, [data])

  useEffect(() => {
    if (updateData && edit) {
        dispatch(setTabEdit(false));
        dispatch(setTabData({}));
        dispatch(toggleShowEditSuccess(true))
        navigate(`/search-results/Places/${updateData.updatePlace.data.attributes.uniqueId}`, {replace: true})
    }
  }, [updateData])

  const fetchData = (skip: number = placeData.length, local: boolean = false, clear: boolean = false) => {
    // get the query from the url parameters
    const searchData = getQueryObj(search);
    // check if the search is coming from local or using link
    const text = local ? searchText : searchData?.search;
    // filter non data from the array object
    const copiedValue = local ? JSON.parse(JSON.stringify(selectedValue)) : searchData?.refinedSearch;
    const searchWordArray = text?.split(" ") || [];
    copiedValue && Object.keys(copiedValue)?.map(x => {
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
      actionType: copiedValue&&copiedValue?.actionType && copiedValue?.actionType,
      keywords: copiedValue&&copiedValue?.keyWords && copiedValue?.keyWords,
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
    }
    refineSearchPlaces(obj)
  };

  const clearTextSearch = () => {
    fetchData(0, true, true);
  }

  const createPlace = async (payload: any | undefined) => {
    const uniqueId = generateUniqueId();

    const data = {
      ...payload,
      asset_config_id: 8,
      keywords: payload.keywords,
      siteType: payload.siteType,
      previousNumber: "",
      placeValue: 0,
      "stateOfConservation": [payload.stateOfConservation],
      "risk": [payload.risk],
      "period": payload.period,
      "researchValue": [payload.researchValue],
      "tourismValue": [payload.tourismValue],
      "recommendation": [payload.recommendation],
      "latitude": payload.latitude,
      "longitude": payload.longitude,
      // "assessmentType": ["Field-based"],
      artifacts: [payload.artifacts]
    }
    if (!edit) {
      data.uniqueId = uniqueId;
      data.placeUIPath = `${webUrl}/search-results/Events/${uniqueId}`;
      createPlaceMutation({variables: data})
    }
    if (edit && tabData?.id) {
      updatePlaceMutation({
        variables: {
          ...data,
          id: tabData.id
        }
      })
    }
  }

  useEffect(() => {

    if (confirmOpenEdit && editPayload && (tabName === PLACES_TAB_NAME)) {

      openEditFlow(editPayload)
      dispatch(toggleConfirmOpenEdit(false));
      dispatch(setEditPayload(null));

    }
  }, [confirmOpenEdit])
  
  const openEditFlow = async (payload: any) => {
    if (payload) {
      const { type, record } = payload;
      if (record) {
        const payloadRes = await placeDetails(record.attributes.uniqueId);
        dispatch(setTabData(payloadRes));
        dispatch(setTabEdit(true));
        dispatch(toggleNewItemWindow(true))
        dispatch(setAddNewItemWindowType(type))
      }
    }
  }

  const setEdit = (payload: any) => {
    if (addNewItemWindowType) {
      /** Detect if user comes via forced edit */
        dispatch(toggleEditConfirmationWindowOpen(true));
        dispatch(setEditPayload(payload));

    } else {
      /** Detect if user comes via normal edit */
      openEditFlow(payload)
    }
  };


  return {
    loading: refineLoading,
    error: refineErrorData,
    data: refinePlaceData,
    mapPlaces,
    hasMoreData,
    fetchPlaces: fetchData,
    clearSearch: clearTextSearch,
    createPlace: createPlace,
    setEdit
  };
};

export default usePlace;
