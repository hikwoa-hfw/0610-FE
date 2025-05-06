"use client";

import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
const useAxios = () => {
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        const accessToken = session?.user.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (
          err?.response.data.message === "No token provided" ||
          err?.response.data.message === "Invalid token" ||
          err?.response.data.message === "Token expired"
        ) {
          signOut();
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return { axiosInstance };
};

export default useAxios;
