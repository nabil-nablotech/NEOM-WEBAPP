import { useEffect, useState } from "react";
import { UserDetails, loginPayload, LoginData } from "../types/User";
import client from '../utils/services/axiosClient';
import {setSession} from '../utils/storage/storage';

const useAuth = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const baseUrl = `https://4ee6-103-179-0-140.in.ngrok.io`;

  useEffect(() => {
    fetchLoginData();
  }, [])

  const clientLogin = async (payload: loginPayload) => {
    const {data} = await client.post<UserDetails>(`/api/auth/local/`, JSON.stringify(payload));
    setSession(data.jwt, JSON.stringify(data.user.id))
    return data;
  }
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
