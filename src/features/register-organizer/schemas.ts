import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterOrganizerSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  bankAccount: Yup.string().required("Bank Account is required"),
  bankName: Yup.string().required("Bank Name is required"),
  profilePict: Yup.mixed().required("Profile picture is required"),
  phoneNumber: Yup.string().required("Phone Number is required")
});
