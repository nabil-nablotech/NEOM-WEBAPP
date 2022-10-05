import { useEffect, useState } from "react";
interface RequestHeaders extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

const useFetch = (url: string, method: string, body: BodyInit | null) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  const baseUrl = `https://cde1-103-179-0-140.in.ngrok.io`;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  
  //     const Options: RequestHeaders = {
  //       method: method,
  //     };
  
  //     try {
  //       const res = await fetch(`${baseUrl}${url}`, Options);
  //       const json = await res.json();
  //       setData(json.data);
  //       setLoading(false);
  //       return json;
  //     } catch (error) {
  //       console.log('error', error)
  //       if (error instanceof Error) return error.message;
  //       else setError(JSON.stringify(error));
  //       setLoading(false);
  //     }
  //   };
  //   // fetchData();
  // }, [url]);

  const client = async (url: string, method: string, body: any) => {
    setLoading(true);
    const Options: RequestHeaders = {
      method: method,
      body: body ? JSON.stringify(body) : '',
    };

    try {
      const res = await fetch(`${baseUrl}${url}`, Options);
      const json = await res.json();
      setLoading(false);
      return json;
    } catch (error) {
      console.log('error', error)
      if (error instanceof Error) return error.message;
      else setError(JSON.stringify(error));
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    client
  };
};

export default useFetch;
