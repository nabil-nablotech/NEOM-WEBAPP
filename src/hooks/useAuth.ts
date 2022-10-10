import { useEffect, useState } from "react";
import { UserDetails, loginPayload, LoginData, User } from "../types/User";
import client from '../utils/services/axiosClient';
import {setSession, getId, setRole, getToken} from '../utils/storage/storage';
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/loginReducers";

const useAuth = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetchLoginData();
    if (getToken()) {
      fetchSession();
    }
  }, []);

  /**
   * get user session details
   */
  const fetchSession = async () => {
    try {
      
      const {data} = await client.get<User>(`/api/users/me?populate=*`);
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
      
      const {data} = await client.post<UserDetails>(`/api/auth/local/`, JSON.stringify(payload));
      await setSession(data.jwt, JSON.stringify(data.user.id));
      await fetchSession();
      await dispatch(setUser(data.user))
      return data;
    } catch (error: any) {
      setError(error.response.data.error.message);
      setLoading(false);
    }
  }
  
 /**
  * Login page UI data with images and background
  * @returns Login state data
  */
  const fetchLoginData = async () => {
    try {
      const res = await client.get<LoginData>(`/api/login?populate[0]=button&populate[1]=input&populate[2]=backgroundImage.image&populate[4]=bottomText&populate[5]=logo.image`);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) return error.message;
        else setError(JSON.stringify(error));
        setLoading(false); 
    }
  }

  function decryptUser(str: string) {
    return decodeURIComponent(window.atob(str));
  }
 
  return {
    loading,
    error,
    data,
    clientLogin,
    fetchLoginData,
    decryptUser,
  };
};

export default useAuth;
