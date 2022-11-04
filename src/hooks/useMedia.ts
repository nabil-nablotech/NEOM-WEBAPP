import { useQuery, useMutation} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { media, refineMedia, addMedia, updateMedia } from "../query/media";
import { RootState } from '../store';
import {setMedia, setMediaMetaData, setSearchText,
  toggleShowAddSuccess,
  toggleNewItemWindow, setAddNewItemWindowType, toggleShowEditSuccess} from '../store/reducers/searchResultsReducer';
import { createMediaAssociate } from '../query/mediaAssociate';
import { tabNameProps } from '../types/SearchResultsTabsProps';
import {limit, getQueryObj, webUrl, generateUniqueId, MEDIA_TAB_NAME} from '../utils/services/helpers';
import { graphQlHeaders } from '../utils/services/interceptor';
import { mediaDetails } from "../api/details";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";

const useMedia = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, media: mediaItem} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  let { tabName } = useParams<{ tabName?: tabNameProps, uniqueId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedValue } = useSelector((state: RootState) => state.refinedSearch);

  useEffect(() => {
    resetMedia();
    if (tabName === "Media") {
      fetchData(0);
    }
  }, []);

  const { edit, tabData } = useSelector(
    (state: RootState) => state.tabEdit
  );

  const resetMedia = async () => {
    await dispatch(setMedia([]));
    await dispatch(setMediaMetaData(null));
  };

  const [createMediaMutation, { loading: addLoading, error: addErr, data: addData }] = useMutation(addMedia, graphQlHeaders());
  const [updateMediaMutation, { loading:updateLoading, error: updateErr, data: updateData, reset }] = useMutation(updateMedia, graphQlHeaders());
  const [createMediaAssociateMutation, { loading: mediaAssociateload, error: mediaAssociateErr, data: mediaAssociate }] = useMutation(createMediaAssociate, graphQlHeaders());

  /**
   * fetch places with two words
   */
  // const { loading, error, data, refetch: refetchMediaItems } = useQuery(media);
  const { loading:refineLoading, error:refineErrorData, data:refineMediaData, refetch: refineSearchMedia,  } = useQuery(refineMedia);

  // useEffect(() => {
  //   if (data?.medias) {
  //     // update the data for the pagination
  //     if (data?.medias.meta.pagination.page === 1 && data?.medias.data.length > 0) {
  //       dispatch(setMedia(data?.medias?.data));
  //     } else if (data?.medias.data.length > 0) {
  //       dispatch(setMedia([...mediaItem, ...data?.medias?.data]));
  //     }
  //     // update the meta data
  //     dispatch(setMediaMetaData(data?.medias?.meta));
  //     // this flag decides to fetch next set of data 
  //     setHasMoreData(data?.medias?.meta.pagination.pageCount !==
  //       data?.medias.meta.pagination.page);
  //   }
  // }, [data?.medias]);

  useEffect(() => {
    if (refineMediaData?.medias) {
      // update the data for the pagination
      if (refineMediaData?.medias.meta.pagination.page === 1 && refineMediaData?.medias.data.length > 0) {
        dispatch(setMedia([...refineMediaData?.medias?.data]));
      } else if (refineMediaData?.medias.data.length > 0) {
        dispatch(setMedia([...mediaItem, ...refineMediaData?.medias?.data]));
      } else if (refineMediaData?.medias?.meta.pagination.total === 0) {
        console.log('media inside else')
        dispatch(setMedia([]));
      }
      // update the meta data
      dispatch(setMediaMetaData(refineMediaData?.medias?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(refineMediaData?.medias?.meta.pagination.pageCount !==
        refineMediaData?.medias.meta.pagination.page);
    }
  }, [refineMediaData?.medias]);

  useEffect(() => {
    if (updateData && edit) {
        dispatch(setTabEdit(false));
        dispatch(setTabData({}));
        dispatch(toggleShowEditSuccess(true))
        navigate(`/search-results/Media/${updateData.updateMedia.data.attributes.uniqueId}`, {replace: true})
    }
  }, [updateData])

  const fetchData = (skip: number = mediaItem.length, local: boolean = false, clear: boolean = false) => {
    const searchData = getQueryObj(search);
    const text = local ? searchText : searchData?.search;
    const searchWordArray = text?.split(' ') || [];
    const copiedValue = local ? JSON.parse(JSON.stringify(selectedValue)) : searchData?.refinedSearch;
    copiedValue && Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    const obj: any = {
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      latitude: copiedValue&&copiedValue?.latitude && parseFloat(copiedValue?.latitude),
      longitude: copiedValue&&copiedValue?.longitude && parseFloat(copiedValue?.longitude),
      categoryType: copiedValue&&copiedValue?.actionType && copiedValue?.actionType,
      keywords: copiedValue&&copiedValue?.keyWords && copiedValue?.keyWords,
      featuredImage: copiedValue&&copiedValue?.featuredImage,
      text: searchWordArray,
      limit: limit,
      skip: skip,
    };
    if (clear) {
      obj.skip = 0;
      obj.search_one = '';
      delete obj.search_two;
      delete obj.search_three;
      refineSearchMedia(obj)
    } else  {
      refineSearchMedia(obj)
    }
    // if(Object.keys(copiedValue).length !== 0){
      // refineSearchMedia(obj)
    // }else{
    //   refetchMediaItems({ search_one: searchWordArray[0] || '', search_two: searchWordArray[1] || '', search_three: searchWordArray[2] || '', limit: limit, skip: skip });
    // }
  };

  const mediaType = (typeCode: string) => {
    let media_type = 5;
    switch (typeCode) {
      case 'VIDEO':
        media_type=6;
        break;
      case '3DMODEL':
        media_type=7;
        break;
    }
    return media_type;
  }
 
  const createMedia = async (payload: any | undefined) => {
    const uniqueId = generateUniqueId();
    const keywords = payload.keywords;
    const data = {
      ...payload,
      title:payload.title,
      description:payload.description,
      bearing:payload.bearing,
      Author:payload.Author,
      asset_config_id: [mediaType(payload.mediaType)], // mediaType should be string
      keywords: keywords,
      latitude: payload.latitude && parseFloat(payload.latitude),
      longitude: payload.longitude && parseFloat(payload.longitude),
      categoryType: payload.categoryType && [payload.categoryType],
      refrerenceUrl:payload.refrerenceUrl
    }
    if (!edit) {
      data.uniqueId = uniqueId;
      data.visitUIPath = `${webUrl}/search-results/Media/${uniqueId}`;
      createMediaMutation({variables: data})
    }
    if (edit && tabData?.id) {
      updateMediaMutation({
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
      dispatch(setAddNewItemWindowType(MEDIA_TAB_NAME))
    }
  };

  const clearTextSearch = () => {
    fetchData(0, true, true);
  }

  return {
    loading: refineLoading,
    error: refineErrorData,
    data: refineMediaData,
    hasMoreData,
    createMedia,
    fetchMediaItems: fetchData,
    setEdit,
    clearSearch: clearTextSearch
  };
};

export default useMedia;
