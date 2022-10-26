import { useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { media, refineMedia } from "../query/search";
import { RootState } from '../store';
import {setMedia, setMediaMetaData, setSearchText} from '../store/reducers/searchResultsReducer'
import {limit, getQueryObj} from '../utils/services/helpers';

const useMedia = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, media: mediaItem} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();
  const { selectedValue } = useSelector(
    (state: RootState) => state.refinedSearch
  );

  useEffect(() => {
    // const searchParams = decodeURIComponent(search).replace('?search=', '');
    
    // if (searchParams.length > 2) {
    //   dispatch(setSearchText(searchParams))
    // }
    resetMedia();
    fetchData(0);
  }, []);

  const resetMedia = async () => {
    await dispatch(setMedia([]));
    await dispatch(setMediaMetaData(null));
  };

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:refetchMediaItems } = useQuery(media);
  const { loading:refineLoading, error:refineErrorData, data:refineMediaData, refetch:refineSearchMedia } = useQuery(refineMedia);

  useEffect(() => {
    if (data?.medias) {
      // update the data for the pagination
      if (data?.medias.meta.pagination.page === 1 && data?.medias.data.length > 0) {
        dispatch(setMedia([...data?.medias?.data]));
      } else if (data?.medias.data.length > 0) {
        dispatch(setMedia([...mediaItem, ...data?.medias?.data]));
      }
      // update the meta data
      dispatch(setMediaMetaData(data?.medias?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(data?.medias?.meta.pagination.pageCount !==
        data?.medias.meta.pagination.page);
    }
  }, [data]);

  useEffect(() => {
    if (refineMediaData?.medias) {
      // update the data for the pagination
      if (refineMediaData?.medias.meta.pagination.page === 1 && refineMediaData?.medias.data.length > 0) {
        dispatch(setMedia([...refineMediaData?.medias?.data]));
      } else if (refineMediaData?.medias.data.length > 0) {
        dispatch(setMedia([...mediaItem, ...refineMediaData?.medias?.data]));
      }
      // update the meta data
      dispatch(setMediaMetaData(refineMediaData?.medias?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(refineMediaData?.medias?.meta.pagination.pageCount !==
        refineMediaData?.medias.meta.pagination.page);
    }
  }, [refineMediaData]);

  const fetchData = (skip: number = mediaItem.length, local: boolean = false) => {
    const searchData = getQueryObj(search);
    const text = local ? searchText : searchData?.search;
    const searchWordArray = text?.split(' ') || [];
    const copiedValue = JSON.parse(JSON.stringify(selectedValue));
    Object.keys(copiedValue).map(x => {
      if (copiedValue[x].length === 0) {delete copiedValue[x];}
      return x;
    });
    if(Object.keys(copiedValue).length !== 0){
      const obj: any = {
        search_one: searchWordArray[0],
        search_two: searchWordArray[1],
        search_three: searchWordArray[2],
        latitude: copiedValue&&copiedValue?.latitude && parseFloat(copiedValue?.latitude),
        longitude: copiedValue&&copiedValue?.longitude && parseFloat(copiedValue?.longitude),
        limit: limit,
        skip: skip,
      };
      refineSearchMedia(obj)
    }else{
      refetchMediaItems({ search_one: searchWordArray[0], search_two: searchWordArray[1], search_three: searchWordArray[2], limit: limit, skip: skip });
    }
  };
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchMediaItems: fetchData
  };
};

export default useMedia;
