import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup)

export const ProfileSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6)
})