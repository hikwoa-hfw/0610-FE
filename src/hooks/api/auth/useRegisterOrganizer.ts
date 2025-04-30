"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegisterOrganizer = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Omit<User, "id">) => {
      const createOrganizerForm = new FormData();

      createOrganizerForm.append("profilePict", payload.profilePict!);
      createOrganizerForm.append("bankAccount", payload.bankAccount!);
      createOrganizerForm.append("bankName", payload.bankName!);
      createOrganizerForm.append("phoneNumber", payload.phoneNumber!);
      createOrganizerForm.append("email", payload.email);
      createOrganizerForm.append("password", payload.password);
      createOrganizerForm.append("fullName", payload.fullName);

      const { data } = await axiosInstance.post(
        "/auth/register-organizer",
        createOrganizerForm,
      );

      return data;
    },
    onSuccess: () => {
      toast.success("Register Success");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useRegisterOrganizer;
