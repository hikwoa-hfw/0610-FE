"use client";
import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface useGetEventsByOrganizerQueries extends PaginationQueries {
  search?: string;
}

const useGetEventsByOrganizer = (queries?: useGetEventsByOrganizerQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>("/events/organizer", {
        params: queries
      });
      console.log(data);
      return data;
    },
    
  });
};

export default useGetEventsByOrganizer;
