import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = process.env.API_BASE_URL || "http://localhost:9000/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  responseType: "json",
});

export default function useAxios<T>(requestConfig: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const handleRequest = () => {
    setLoading(true);
    axiosInstance
      .request(requestConfig)
      .then((response: AxiosResponse) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleRequest();
  }, []);

  const response = { data, loading, error };

  return [response, handleRequest];
}
