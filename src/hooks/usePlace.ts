import {useQuery} from '@apollo/client';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { places, getAllPlaces } from "../query/search";
import { RootState } from '../store';

const usePlace = () => {

  const {searchText} = useSelector((state: RootState) => state.searchResults)

  useEffect(() => {
    if (searchText) {
      const text = searchText.split(' ');
      fetchPlaces({search_one: text[0], search_two: text[1]});
    } else {
      fetchAllPlaces()
    }
  }, [])

  /**
   * fetch places with two words
   */
  const { loading, error, data: searchResult, refetch:fetchPlaces } = useQuery(places);
  /**
   * Fetch all teh places without search text
   */
  const { loading: placesLoading, error: allplaceError, data, refetch:fetchAllPlaces } = useQuery(getAllPlaces);
  
  console.log('places', data);


  return {
    loading,
    error,
    data,
    fetchPlaces
  };
};

export default usePlace;
