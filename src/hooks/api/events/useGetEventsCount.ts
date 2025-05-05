"use client";
import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";



const useGetEventsCount = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event[]>>("/events/organizer", )
      return data;
    },
  });
};

export default useGetEventsCount;
