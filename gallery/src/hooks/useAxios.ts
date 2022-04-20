import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = process.env.API_BASE_URL || "https://api.unsplash.com";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  responseType: "json",
});

interface IUseAxiosProps extends AxiosRequestConfig {
  manual?: boolean;
}

const useAxios = <T>(requestConfig: IUseAxiosProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const { url } = requestConfig;

  const handleRequest = useCallback(() => {
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
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!requestConfig.manual) handleRequest();
  }, [requestConfig.manual, handleRequest]);

  return { data: data as T, loading, error, handleRequest };
};

export default useAxios;
