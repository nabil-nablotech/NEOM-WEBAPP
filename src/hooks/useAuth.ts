import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeUser } from "../api/user";
import { setUser } from "../store/reducers/loginReducers";
import {getToken, setRole} from '../utils/storage/storage';
import { fetchSearchCount } from '../api/dashboard';
import { setTotalCounts } from "../store/reducers/searchResultsReducer";
import { RootState } from "../store";

const useAuth = () => {
  const dispatch = useDispatch();
  const { edit, event  } = useSelector(
    (state: RootState) => state.event
  );
  const { edit: tabEdit, tabData  } = useSelector(
    (state: RootState) => state.tabEdit
  );
  const { showAddSuccess, deleteItemSuccess } = useSelector((state: RootState) => state.searchResults);
  
  useEffect(() => {
    if (getToken()) {
      fetchSession();
      getSearchCount();
    }
  }, [edit, tabEdit]);

  /**refresh count */
  useEffect(() => {
    if (showAddSuccess || deleteItemSuccess) {
      getSearchCount();
    }
  }, [showAddSuccess , deleteItemSuccess]);

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
