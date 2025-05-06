"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQueries extends PaginationQueries {
  search?: string;
}

const useGetTransactionDetail = (
  uuid: string,
  queries?: GetTransactionsQueries,
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["transactions", queries, uuid],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction>(
        `/transactions/${uuid}`,
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetTransactionDetail;
