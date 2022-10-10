import { useEffect, useState } from "react";
import { UserDetails, loginPayload, LoginData, User } from "../types/User";
import client from '../utils/services/axiosClient';
import {setSession, getId, setRole, getToken} from '../utils/storage/storage';
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/loginReducers";
import { login } from "../api/auth";
import useLogin from "./useLogin";

const useAuth = () => {
  const dispatch = useDispatch();
  const {clientLogin, fetchSession} = useLogin();
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
    fetchLoginData
  };
};

export default useAuth;
