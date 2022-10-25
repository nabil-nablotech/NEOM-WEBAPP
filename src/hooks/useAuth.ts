import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMeUser } from "../api/user";
import { setUser } from "../store/reducers/loginReducers";
import {getToken, setRole} from '../utils/storage/storage';
import { fetchSearchCount } from '../api/dashboard';
import { setTotalCounts } from "../store/reducers/searchResultsReducer";

const useAuth = () => {
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
      // await dispatch(setSearchText(''));
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
    
  };
};

export default useAuth;
