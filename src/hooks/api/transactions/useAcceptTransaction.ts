"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useAcceptTransaction = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      const { data } = await axiosInstance.patch(`/transactions/accept-transaction/${uuid}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Accept transaction success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: async (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useAcceptTransaction;
