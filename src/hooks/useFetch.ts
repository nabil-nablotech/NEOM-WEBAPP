import { useEffect, useState } from "react";
interface RequestHeaders extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

const useFetch = (url: string, method: string, body: BodyInit | null) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const baseUrl = `https://1761-103-179-0-140.in.ngrok.io`;

      console.log('inside usefetch funcio')
      const Options: RequestHeaders = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        }
      };
      // if (method === "GET") {
      //   delete Options.body;
      // }
      try {
        const res = await fetch(`${baseUrl}${url}`, Options);
        console.log('response of fetch', res)
        const json = await res.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) return error.message;
        else setError(JSON.stringify(error));
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    loading,
    error,
    data,
  };
};

export default useFetch;
