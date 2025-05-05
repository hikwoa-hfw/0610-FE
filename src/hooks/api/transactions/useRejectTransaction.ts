"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useRejectTransaction = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (uuid: string) => {
      const { data } = await axiosInstance.patch(`/transactions/reject-transaction/${uuid}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Reject transaction success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: async (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useRejectTransaction;
