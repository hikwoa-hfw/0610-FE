"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload extends Omit<Event, "thumbnail"> {
  thumbnail: File | null;
}

const useUpdateEvent = (slug?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const {
        name,
        description,
        category,
        locationDetail,
        startDate,
        endDate,
        thumbnail,
      } = payload;
      const updateEventForm = new FormData();

      if (name) updateEventForm.append("name", name);
      if (description) updateEventForm.append("description", description);
      if (category) updateEventForm.append("category", category);
      if (locationDetail)
        updateEventForm.append("locationDetail", locationDetail);
      if (startDate) updateEventForm.append("startDate", startDate);
      if (endDate) updateEventForm.append("endDate", endDate);
      if (thumbnail) updateEventForm.append("thumbnail", thumbnail!);

      if (slug) {
        const { data } = await axiosInstance.patch(
          `/events/${slug}`,
          updateEventForm,
        );
        return data;
      }
    },

    onSuccess: async () => {
      toast.success("Update event success");
      await queryClient.invalidateQueries({ queryKey: ["updateevent"] });
      router.push("/dashboard/events");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateEvent;
