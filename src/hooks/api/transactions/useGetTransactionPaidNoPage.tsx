"use client";

import useAxios from "@/hooks/useAxios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionsPaidNoPage = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["paidnopage"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction[]>(
        "/transactions/paidnopage",
      );
      console.log("ini data", data);
      
      return data;
    },
  });
};

export default useGetTransactionsPaidNoPage;
