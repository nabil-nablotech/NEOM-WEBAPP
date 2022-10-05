import { useEffect, useState } from "react";
import client from '../utils/services/axiosClient';
import {UserDetails} from '../types/User';


const useLogin = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
 
  const fetchData = async (payload: {identifier: string, password: string}) => {
    setLoading(true);

    const url = `/api/auth/local`;
    try {
      const res = await client.post<UserDetails>(
        url, 
        payload
      )
      console.log(res, 'response of login');
      setData(res.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) return error.message;
      else setError(JSON.stringify(error));
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    fetchData
  };
};

export default useLogin;
