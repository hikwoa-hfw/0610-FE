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
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import Link from "next/link";
import { RegisterSchema } from "../schemas";
import useRegisterUser from "@/hooks/api/auth/useRegisterUser";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {mutateAsync: register, isPending} = useRegisterUser();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
      referralCodeUsed: "",
      role:"USER"
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
     await register(values)
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register <span className="font-bold text-blue-700">Vibration</span> </CardTitle>
          <CardDescription>
            Enter your data below to create account
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
                  <Label htmlFor="referralCodeUsed">Refferal Code</Label>
                </div>
                <Input
                  id="referralCodeUsed"
                  name="referralCodeUsed"
                  type="referralCodeUsed"
                  value={formik.values.referralCodeUsed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.referralCodeUsed && !!formik.errors.referralCodeUsed && (
                  <p className="text-xs text-red-500">{formik.errors.referralCodeUsed}</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-600" disabled={isPending} >
                {isPending? "Loading..." : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Or register as{" "}
              <Link href="/register-organizer" className="underline underline-offset-4">
                Organizer
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
