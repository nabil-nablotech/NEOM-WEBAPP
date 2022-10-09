import { useEffect, useState } from "react";
import { UserDetails, loginPayload, LoginData, User } from "../types/User";
import client from '../utils/services/axiosClient';
import {setSession, removeSession, getId, setRole} from '../utils/storage/storage';
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/loginReducers";

const useAuth = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  /**
   * get user session details
   */
  const logout = async () => {
    const id = getId();
    try {
      const payload = {}
      const {data} = await client.put<User>(`/api/users/me`, JSON.stringify(payload));
      clientLogout();
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
      await dispatch(setUser(data.user))
      setSession(data.jwt, JSON.stringify(data.user.id));
      return data;
    } catch (error: any) {
      setError(error.response.data.error.message);
      setLoading(false);
    }
  }

  /**
   * Logout of the user
   */
  const clientLogout = async () => {
    removeSession();
    window.location.reload();
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

  return {
    loading,
    error,
    data,
    clientLogin,
    fetchLoginData,
    clientLogout
  };
};

export default useAuth;
