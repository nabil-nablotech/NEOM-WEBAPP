import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { refineMedia, addMedia, updateMedia } from "../query/media";
import { addLibrary } from "../query/library";
import { RootState } from '../store';
import {
  setMedia, setMediaMetaData,
  toggleShowAddSuccess,
  toggleNewItemWindow, setAddNewItemWindowType, toggleShowEditSuccess, resetMediaAssociation, setDefaultMediaAssociation, storeAddItemProgressState, toggleEditConfirmationWindowOpen, toggleConfirmOpenEdit, setEditPayload} from '../store/reducers/searchResultsReducer';
import { createMediaAssociate, updateMediaAssociate } from '../query/mediaAssociate';
import { tabNameProps } from '../types/SearchResultsTabsProps';
import { limit, getQueryObj, webUrl, generateUniqueId, MEDIA_TAB_NAME, formatBytes, formatStrapiDate } from '../utils/services/helpers';
import { graphQlHeaders } from '../utils/services/interceptor';
import { mediaDetails } from "../api/details";
import { setTabData, setTabEdit } from "../store/reducers/tabEditReducer";

const useMedia = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, media: mediaItem, associatedPlaces, associatedEvents,
    addNewItemWindowType, confirmOpenEdit, editPayload } = useSelector((state: RootState) => state.searchResults);
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

  const [createMediaMutation, { loading: addLoading, error: addErr, data: addData }] = useMutation(addLibrary, graphQlHeaders());
  const [updateMediaMutation, { loading: updateLoading, error: updateErr, data: updateData, reset }] = useMutation(updateMedia, graphQlHeaders());
  const [createMediaAssociateMutation, { loading: mediaAssociateload, error: mediaAssociateErr, data: mediaAssociate }] = useMutation(createMediaAssociate, graphQlHeaders());
  const [updateMediaAssociateMutation, { loading: updateMediaAssociateload, error: updateMediaAssociateErr, data: updateMediaAssociateData }] = useMutation(updateMediaAssociate, graphQlHeaders());

  const createAssociation = async (mediaId: number) => {
    if (associatedPlaces.length > 0 || associatedEvents.length > 0) {
      await createMediaAssociateMutation({
        variables: {
          "place_unique_ids": associatedPlaces.map(x => x.id),
          "visit_unique_ids": associatedEvents.map(x => x.id),
          "media_unique_id": mediaId
        }
      });
    }

  }

  const resetEdit = () => {
    dispatch(setTabData({}));
    dispatch(setTabEdit(false));
  }
  /**
   * fetch places with two words
   */
  const { loading: refineLoading, error: refineErrorData, data: refineMediaData, refetch: refineSearchMedia, } = useQuery(refineMedia);

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
    if (addData) {
      createAssociation(addData.createMedia.data.id);
    }
    if (updateData) {
      resetEdit();
      if (updateData?.updateMedia.data.attributes?.media_associate?.data?.id) {
        updateMediaAssociateMutation({
          variables: {
            "id": updateData?.updateMedia?.data.attributes?.media_associate?.data?.id,
            "place_unique_ids": associatedPlaces.map(x => x.id),
            "visit_unique_ids": associatedEvents.map(x => x.id),
          }
        })
      } else {
        createAssociation(Number(updateData?.updateMedia.data.id));
      }

      dispatch(toggleShowEditSuccess(true));

      dispatch(storeAddItemProgressState(null));
      /** re-direct */
      navigate(`/search-results/Media/${updateData?.updateMedia.data.attributes.uniqueId}`, { replace: true })

    }
  }, [addData, updateData, addErr])


  useEffect(() => {
    let id = null;
    if (addData) {
      id = addData?.createMedia?.data?.attributes?.uniqueId;
    }
    if (updateMediaAssociateData) {
      dispatch(resetMediaAssociation(null));
    }
    if (mediaAssociate) {
      dispatch(resetMediaAssociation(null));
      if (id) {

        dispatch(storeAddItemProgressState(null));
        navigate(`/search-results/Media/${id}`, { replace: true })
      }
    }
  }, [mediaAssociate, updateMediaAssociateData])

  const fetchData = (skip: number = mediaItem.length, local: boolean = false, clear: boolean = false) => {
    const searchData = getQueryObj(search);
    const text = local ? searchText : searchData?.search;
    const searchWordArray = text?.split(' ') || [];
    const copiedValue = local ? JSON.parse(JSON.stringify(selectedValue)) : searchData?.refinedSearch;
    copiedValue && Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) { delete copiedValue[x]; }
      return x;
    });
    const obj: any = {
      search_one: searchWordArray[0],
      search_two: searchWordArray[1],
      search_three: searchWordArray[2],
      latitude: copiedValue && copiedValue?.latitude && parseFloat(copiedValue?.latitude),
      longitude: copiedValue && copiedValue?.longitude && parseFloat(copiedValue?.longitude),
      categoryType: copiedValue && copiedValue?.actionType && copiedValue?.actionType,
      keywords: copiedValue && copiedValue?.keyWords && copiedValue?.keyWords,
      featuredImage: copiedValue && copiedValue?.featuredImage,
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
    } else {
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
        media_type = 6;
        break;
      case '3DMODEL':
        media_type = 7;
        break;
    }
    return media_type;
  }

  const createMedia = async (payload: any | undefined) => {
    console.log('inside craete media', payload)
    const uniqueId = generateUniqueId();
    const keywords = payload.keywords;
    const data = {
      ...payload,
      visitNumber: parseFloat(payload.visitNumber),
      asset_config_id: [mediaType(payload.media_type)], // documentType should be string and media type
      keywords: keywords,
      siteType: payload.siteType && payload.siteType,
      "latitude": payload.latitude && parseFloat(payload.latitude),
      "longitude": payload.longitude && parseFloat(payload.longitude),
      "categoryType": payload.categoryType && payload?.categoryType,
      object: payload?.object && payload?.object[0].id,
      fileSize: payload?.object && formatBytes(parseFloat(payload?.object[0]?.size)),
      storage: payload?.object && payload?.object[0]?.provider,
      dimension: payload?.object && `${payload?.object[0]?.height}x${payload?.object[0]?.width}`,
      refrenceURL: payload?.url,
      objectURL: payload?.embedCode,
      make: "",
      model: "",
      depth: "",
      modified: new Date(),
    }
    if (!edit) {
      data.uniqueId = uniqueId;
      data.created = formatStrapiDate(new Date());
      data.mediaUIPath = `${webUrl}/search-results/Media/${uniqueId}`;
      createMediaMutation({ variables: data })
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

  useEffect(() => {
    if (confirmOpenEdit && editPayload && (tabName === MEDIA_TAB_NAME)) {

      openEditFlow(editPayload)
      dispatch(toggleConfirmOpenEdit(false));
      dispatch(setEditPayload(null));

    }
  }, [confirmOpenEdit])

  const openEditFlow = async (payload: any) => {
    if (payload) {
      const payloadRes = await mediaDetails(payload.attributes.uniqueId);
      dispatch(setTabData(payloadRes));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true))
      dispatch(setAddNewItemWindowType(MEDIA_TAB_NAME))
      dispatch(setDefaultMediaAssociation({ events: payloadRes.media_associate?.visit_unique_ids || [], places: payloadRes.media_associate?.place_unique_ids || [] }));
    }
  }


  const setEdit = async (payload: any) => {
    if (addNewItemWindowType) {
      /** Detect if user comes via forced edit */
      dispatch(toggleEditConfirmationWindowOpen(true));
      dispatch(setEditPayload(payload));

    } else {
      /** Detect if user comes via normal edit */
      openEditFlow(payload)
    }
  };

  const setEditMedia = async (payload: any) => {
    if (payload) {
      const payloadRes = await mediaDetails(payload.attributes.uniqueId);
      dispatch(setTabData(payloadRes));
      dispatch(setTabEdit(true));
      dispatch(toggleNewItemWindow(true))
      dispatch(setAddNewItemWindowType(MEDIA_TAB_NAME))
      dispatch(setDefaultMediaAssociation({ events: payloadRes.media_associate?.visit_unique_ids || [], places: payloadRes.media_associate?.place_unique_ids || [] }));
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
    setEditMedia,
    clearSearch: clearTextSearch,
    searchData: getQueryObj(search)
  };
};

export default useMedia;
