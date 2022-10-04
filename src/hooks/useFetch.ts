import { useEffect, useState } from "react";
import { ErrorCallback } from "typescript";

const useFetch = (url: string) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) return error.message;
        else setError(JSON.stringify(error));
        setLoading(false);
      }
    } 

    fetchData()
  }, [url])
  
  return {
    loading,
    error,
    data
  }
};

export default useFetch;
