import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Payload extends Omit<User, "profilePict"> {
  profilePict: File | null;
}

const useUpdateOrganizer = () => {
  const queryClient = useQueryClient();
  const {axiosInstance} = useAxios()

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const {
        fullName,
        email,
        password,
        phoneNumber,
        bankAccount,
        bankName,
        profilePict,
      } = payload;
      const updateUserForm = new FormData();

      if (payload.fullName) updateUserForm.append("fullName", payload.fullName);
      if (payload.email) updateUserForm.append("email", payload.email);
      if (payload.password) updateUserForm.append("password", payload.password);

      const { data } = await axiosInstance.patch(
        `/users/update-user`,
        updateUserForm,
      );

      console.log(data);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("Account Updated Successfully");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error);
      
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useUpdateOrganizer;
