"use client";

import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

// interface GetTransactionsQueries extends PaginationQueries {
//   search?: string;
// }

const useGetEventOrganizerBySlug = (
  slug: string,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["organizer", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(
        `/events/organizer/${slug}`,
      );
      return data;
    },
  });
};

export default useGetEventOrganizerBySlug;
