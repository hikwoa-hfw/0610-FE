"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQueries extends PaginationQueries {
  search?: string;
}

const useGetTransactions = (queries?: GetTransactionsQueries) => {
    const {axiosInstance} = useAxios()

  return useQuery({
    queryKey: ["transactions", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/transactions",
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetTransactions;
