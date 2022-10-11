import { useEffect, useState } from "react";
import { fetchMeUser } from "../api/user";
import { setUser } from "../store/reducers/loginReducers";
import {getToken, setRole} from '../utils/storage/storage';
import useLogin from "./useLogin";

const useAuth = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (getToken()) {
      fetchSession();
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
 
  return {
    loading,
    error,
    data
  };
};

export default useAuth;
function dispatch(arg0: { payload: import("../types/User").User; type: string; }) {
  throw new Error("Function not implemented.");
}

