"use client";
import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/users");
      return data;
    },
  });
};

export default useGetUser;