"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useDeleteEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      const { data } = await axiosInstance.delete(`/events/${slug}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Delete event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/dashboard/events");
    },
    onError: async (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteEvent;
