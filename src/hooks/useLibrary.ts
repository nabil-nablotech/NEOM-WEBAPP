import {useQuery} from '@apollo/client';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { library } from "../query/library";
import { RootState } from '../store';
import {setLibrary, setLibraryMetaData, setSearchText} from '../store/reducers/searchResultsReducer';
import {limit} from '../utils/services/helpers';

const useLibrary = () => {
  const [hasMoreData, setHasMoreData] = useState(false);

  const {searchText, library: libItem} = useSelector((state: RootState) => state.searchResults);
  const {search} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = decodeURIComponent(search).replace('?search=', '');
    
    if (searchParams.length > 2) {
      dispatch(setSearchText(searchParams))
    }
    resetLib();
    fetchData(0);
  }, []);

  const resetLib = async () => {
    await dispatch(setLibrary([]));
    await dispatch(setLibraryMetaData(null));
  };

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:refetchLibraryItems } = useQuery(library);

  useEffect(() => {
    if (data?.medias) {
      // update the data for the pagination
      if (data?.medias.meta.pagination.page === 1 && data?.medias.data.length > 0) {
        dispatch(setLibrary([...data?.medias?.data]));
      } else if (data?.medias.data.length > 0) {
        dispatch(setLibrary([...libItem, ...data?.medias?.data]));
      }
      // update the meta data
      dispatch(setLibraryMetaData(data?.medias?.meta));
      // this flag decides to fetch next set of data 
      setHasMoreData(data?.medias?.meta.pagination.pageCount !==
        data?.medias.meta.pagination.page);
    }
  }, [data])
  
  const fetchData = (skip: number = libItem.length, local: boolean = false) => {
    const text = local ? searchText : decodeURIComponent(search.replace("?search=", ""));
    const searchWordArray = text.split(' ');
    refetchLibraryItems({ search_one: searchWordArray[0], search_two:searchWordArray[1], search_three:searchWordArray[2], limit: limit, skip: skip });
  };
 
  return {
    loading,
    error,
    data,
    hasMoreData,
    fetchLibraryItems: fetchData
  };
};

export default useLibrary;
