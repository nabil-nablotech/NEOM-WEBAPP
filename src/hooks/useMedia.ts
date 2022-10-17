import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { media } from "../query/search";
import { RootState } from '../store';
import {setMedia, setMediaMetaData} from '../store/reducers/searchResultsReducer'

const useMedia = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, media: mediaItem} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));
    fetchMediaItems({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchMediaItems } = useQuery(media);

  useEffect(() => {
    if (mediaItem.length <= data?.medias.meta.pagination.total) {
      setHasMoreData(true);
      dispatch(setMedia(data?.medias.data));
      dispatch(setMediaMetaData(data?.medias?.meta));
    } else {
      setHasMoreData(false);
    }
  }, [data])
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchMediaItems
  };
};

export default useMedia;
