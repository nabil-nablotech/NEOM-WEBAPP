import { useState } from "react";
import { loginPayload, User } from "../types/User";
import client from '../utils/services/axiosClient';
import {setSession, getId, setRole, getToken} from '../utils/storage/storage';
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/loginReducers";
import { login } from "../api/auth";
import { fetchMeUser } from "../api/user";

const useLogin = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

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
  * Login of the user
  */
  const clientLogin = async (payload: loginPayload) => {
    try {
      
      const data = await login(payload);
      console.log('data', data);
      await setSession(data.jwt, JSON.stringify(data.user.id));
      await fetchSession();
      await dispatch(setUser(data.user))
      return data;
    } catch (error: any) {
      setError(error.response.data.error.message);
      setLoading(false);
    }
  }
  
 
  return {
    loading,
    error,
    data,
    clientLogin,
    fetchSession
  };
};

export default useLogin;
