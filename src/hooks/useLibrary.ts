import {useQuery, useMutation} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { addLibrary, library, updateLibrary } from "../query/library";
import { createMediaAssociate } from '../query/mediaAssociate';
import { RootState } from '../store';
import { resetMediaAssociation, setAddNewItemWindowType, setLibrary, setLibraryMetaData, toggleNewItemWindow, toggleShowAddSuccess, toggleShowEditSuccess} from '../store/reducers/searchResultsReducer';
import { tabNameProps } from '../types/SearchResultsTabsProps';
import {limit, getQueryObj, webUrl, generateUniqueId, EVENTS_TAB_NAME, LIBRARY_TAB_NAME} from '../utils/services/helpers';
import { graphQlHeaders } from '../utils/services/interceptor';
import { mediaDetails } from "../api/details";
import { setTabData, setTabEdit } from '../store/reducers/tabEditReducer';

const useLibrary = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, library: libItem, associatedPlaces, associatedEvents} = useSelector((state: RootState) => state.searchResults);
  const { selectedValue } = useSelector(
    (state: RootState) => state.refinedSearch
  );

  const { edit, tabData } = useSelector(
    (state: RootState) => state.tabEdit
  );

  const {search} = useLocation();
  let { tabName } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    resetLib();
    if (tabName === "Library") {
      fetchData(0);
    }
  }, []);

  const resetLib = async () => {
    await dispatch(setLibrary([]));
    await dispatch(setLibraryMetaData(null));
  };

  const [createLibraryMutation, { loading: addLoading, error: addErr, data: addData }] = useMutation(addLibrary, graphQlHeaders());
  const [updateLibraryMutation, { loading:updateLoading, error: updateErr, data: updateData, reset }] = useMutation(updateLibrary, graphQlHeaders());
  const [createMediaAssociateMutation, { loading: mediaAssociateload, error: mediaAssociateErr, data: mediaAssociate }] = useMutation(createMediaAssociate, graphQlHeaders());


  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:refetchLibraryItems } = useQuery(library);
  // const { loading:refineLoading, error:refineErrorData, data:refineLibraryData, refetch: refineSearchLibrary } = useQuery(refineLibrary);

  useEffect(() => {
    if (data?.medias) {
      // update the data for the pagination
      if (data?.medias.meta.pagination.page === 1 && data?.medias.data.length > 0) {
        dispatch(setLibrary([...data?.medias?.data]));
      } else if (data?.medias.data.length > 0) {
        dispatch(setLibrary([...libItem, ...data?.medias?.data]));
      } else if (data?.medias?.meta.pagination.total === 0) {
        dispatch(setLibrary([]));
      }
      // update the meta data
      dispatch(setLibraryMetaData(data?.medias?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(data?.medias?.meta.pagination.pageCount !==
        data?.medias.meta.pagination.page);
    }
  }, [data])

  const createAssociation = async () => {
    if (associatedPlaces.length > 0) {
      await createMediaAssociateMutation({variables: {
        "place_unique_ids": associatedPlaces.map(x => x.id),
        "visit_unique_ids": associatedEvents.map(x => x.id),
        "media_unique_id": addData.createMedia.data.id
      }});
    }

  }

  useEffect(() => {
    if (addData) {
      createAssociation();
    }

    if(updateData) {
      dispatch(toggleShowEditSuccess(true))

      /** re-direct */
      navigate(`/search-results/Library`, {replace: true})
    }
  }, [addData, updateData])

  useEffect(() => {
    if (mediaAssociate) {
      dispatch(resetMediaAssociation(null));
      dispatch(toggleShowAddSuccess(true));
      navigate(`/search-results/Library`, {replace: true})
    }
  }, [mediaAssociate])
  
  const fetchData = (skip: number = libItem.length, local: boolean = false, clear: boolean = false) => {
    const searchData = getQueryObj(search);
    const text = local ? searchText : searchData?.search;
    const searchWordArray = text?.split(' ') || [];
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    const obj: any = {
      search_one: searchWordArray[0] || '',
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
      refetchLibraryItems(obj)
    } {
      refetchLibraryItems(obj);
    }
  };

  const mediaType = (typeCode: string) => {
    let media_type = 2;
    switch (typeCode) {
      case 'REFERENCEURL':
        media_type=3;
        break;
      case 'INLINE':
        media_type=4;
        break;
    }
    return media_type;
  }
 
  const createLibrary = async (payload: any | undefined) => {
    const uniqueId = generateUniqueId();
    const keywords = payload.keywords;
    const data = {
      ...payload,
      visitNumber: parseFloat(payload.visitNumber),

      asset_config_id: [mediaType(payload.documentType)], // documentType should be string and media type
      keywords: keywords,
      siteType: payload.siteType && payload.siteType,
      "latitude": payload.latitude && parseFloat(payload.latitude),
      "longitude": payload.longitude && parseFloat(payload.longitude),
      "categoryType": payload.categoryType && [payload.categoryType],
    }
    if (!edit) {
      data.uniqueId = uniqueId;
      data.visitUIPath = `${webUrl}/search-results/Events/${uniqueId}`;
      createLibraryMutation({variables: data})
    }
    if (edit && tabData?.id) {
      updateLibraryMutation({
        variables: {
          ...data,
          id: tabData.id
        }
      })
    }
  }

  const setEdit = async (payload: any) => {
    if (payload) {
      const payloadRes = await mediaDetails(payload.attributes.uniqueId);
      dispatch(setTabData(payloadRes));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true))
      dispatch(setAddNewItemWindowType(LIBRARY_TAB_NAME ))
    }
  };

  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchLibraryItems: fetchData,
    createLibrary,
    setEdit
  };
};

export default useLibrary;
