import {useQuery} from '@apollo/client';
import { useEffect } from 'react';
import { places } from "../query/search";

const usePlace = () => {

  /**
   * fetch places with two words
   */
  const { loading, error, data, refetch:fetchPlaces } = useQuery(places);
  
  return {
    loading,
    error,
    data,
    fetchPlaces
  };
};

export default usePlace;
