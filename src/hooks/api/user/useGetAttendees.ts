"use client";

import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQueries extends PaginationQueries {
  search?: string;
}

const useGetAttendees = (
  slug: string,
  queries?: GetTransactionsQueries,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["users", queries, slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        `/users/${slug}`,
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetAttendees;
