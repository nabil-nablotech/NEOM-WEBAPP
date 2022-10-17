import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { library } from "../query/search";
import { RootState } from '../store';
import {setLibrary, setLibraryMetaData} from '../store/reducers/searchResultsReducer'

const useLibrary = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, library: libItem} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const text = searchText || decodeURIComponent(search.replace('?search=', ''));
    fetchLibraryItems({search_one: text});
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchLibraryItems } = useQuery(library);
  console.log('outside effect if----', data)
  useEffect(() => {
    console.log('inside if----', data)
    if (libItem.length <= data?.medias.meta.pagination.total) {
      setHasMoreData(true);
      dispatch(setLibrary(data?.medias.data));
      dispatch(setLibraryMetaData(data?.medias?.meta));
    } else {
      setHasMoreData(false);
    }
  }, [data])
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchLibraryItems
  };
};

export default useLibrary;
