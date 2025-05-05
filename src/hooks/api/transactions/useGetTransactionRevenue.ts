"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction, TransactionRevenue } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";



const useGetTransactionRevenue = () => {
    const {axiosInstance} = useAxios()

  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data  } = await axiosInstance.get<TransactionRevenue>(
        "/transactions/revenue",
      );
      return data._sum;
    },
  });
};

export default useGetTransactionRevenue;
