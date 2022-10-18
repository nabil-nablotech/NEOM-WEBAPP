import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { media } from "../query/search";
import { RootState } from '../store';
import {setMedia, setMediaMetaData} from '../store/reducers/searchResultsReducer'
import {limit} from '../utils/services/helpers';

const useMedia = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, media: mediaItem} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
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

  const fetchData = (skip: number = mediaItem.length, local: boolean = false) => {
    const text = local ? searchText : decodeURIComponent(search.replace("?search=", ""));
    const searchWordArray = text.split(' ');
    refetchMediaItems({ search_one: searchWordArray[0], search_two: searchWordArray[1], search_three: searchWordArray[2], limit: limit, skip: skip });
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
