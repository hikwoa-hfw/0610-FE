import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UpdateUserPayload {
  id: number;
  fullName?: string;
  email?: string;
  password?: string;
  profilePicture?: File | null;
  phoneNumber?: string;
  point?: number;
  pointExpired?: Date;
  bankAccount?: string | null;
}

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: User) => {
      const updateUserForm = new FormData();

      if (payload.fullName) updateUserForm.append("fullName", payload.fullName);
      if (payload.email) updateUserForm.append("email", payload.email);
      if (payload.password) updateUserForm.append("password", payload.password);
      if (payload.phoneNumber)
        updateUserForm.append("phoneNumber", payload.phoneNumber);
      if (payload.profilePict) {
        updateUserForm.append("profilePicture", payload.profilePict);
      }
      if (payload.bankAccount) {
        updateUserForm.append("bankAccount", payload.bankAccount);
      }

      const { data } = await axiosInstance.patch(
        `/users/${payload.id}`,
        updateUserForm,
      );

      console.log(data);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User Updated Successfully");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useUpdateUser;
