import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMeUser } from "../api/user";
import { setUser } from "../store/reducers/loginReducers";
import {getToken, setRole} from '../utils/storage/storage';
import { fetchSearchCount } from '../api/dashboard';
import { setTotalCounts } from "../store/reducers/searchResultsReducer";

const useAuth = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken()) {
      fetchSession();
      getSearchCount();
    }
  }, []);

  /**
   * get user session details
   */
   const fetchSession = async () => {
    try {
      
      const data = await fetchMeUser();
      await dispatch(setUser(data));
      setRole(data.role.name);
      return data;
    } catch (error) {
      // console.log('error', error)
    }
  }
  /**
   * get user session details
   */
   const getSearchCount = async () => {
    try {
      
      const data = await fetchSearchCount();
      await dispatch(setTotalCounts(data));
      return data;
    } catch (error) {
      // console.log('error', error)
    }
  }
 
  return {
    loading,
    error,
    data
  };
};

export default useAuth;
