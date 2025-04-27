"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegisterOrganizer from "@/hooks/api/auth/useRegisterOrganizer";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { RegisterOrganizerSchema } from "../schemas";

export function RegisterOrganizerForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {mutateAsync: register, isPending} = useRegisterOrganizer();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
      role:"USER",
      profilePict: "",
      phoneNumber: "",
      bankAccount: "",
      bankName: ""
    },
    validationSchema: RegisterOrganizerSchema,
    onSubmit: async (values) => {
     await register(values)
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register as Organizer</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="fullName"
                  name="fullName"
                  placeholder="your name"
                  required
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.fullName && !!formik.errors.fullName && (
                  <p className="text-xs text-red-500">{formik.errors.fullName}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.email && !!formik.errors.email && (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.password && !!formik.errors.password && (
                  <p className="text-xs text-red-500">{formik.errors.password}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                </div>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  required
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.phoneNumber && !!formik.errors.phoneNumber && (
                  <p className="text-xs text-red-500">{formik.errors.phoneNumber}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="bankAccount">Bank Account</Label>
                </div>
                <Input
                  id="bankAccount"
                  name="bankAccount"
                  type="bankAccount"
                  required
                  value={formik.values.bankAccount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.bankAccount && !!formik.errors.bankAccount && (
                  <p className="text-xs text-red-500">{formik.errors.bankAccount}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="bankName">Bank Name</Label>
                </div>
                <Input
                  id="bankName"
                  name="bankName"
                  type="bankName"
                  required
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.bankName && !!formik.errors.bankName && (
                  <p className="text-xs text-red-500">{formik.errors.bankName}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="profilePict">Profile Picture</Label>
                </div>
                <Input
                  id="profilePict"
                  name="profilePict"
                  type="file"
                  required
                  value={formik.values.profilePict}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.profilePict && !!formik.errors.profilePict && (
                  <p className="text-xs text-red-500">{formik.errors.profilePict}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending? "Loading..." : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
