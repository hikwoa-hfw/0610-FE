"use client";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetUser from "@/hooks/api/user/useGetUser";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";
import { getChangedValues } from "@/utils/getChangedValue";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useRef, useState } from "react";

export default function UserUpdatePage() {
  const { data: getUser, isPending: pendingGet } = useGetUser();
  const { mutateAsync: updateUser, isPending: pendingUpdate } = useUpdateUser();
  const session = useSession();

  const initialValues = {
    fullName: getUser?.fullName || "",
    email: getUser?.email || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = getChangedValues(values, initialValues);
      await updateUser(payload);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const profilePictRef = useRef<HTMLInputElement>(null);

  const onChangeProfilePict = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("profilePict", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeProfilePict = () => {
    formik.setFieldValue("profilePict", null);
    setSelectedImage("");
    if (profilePictRef.current) {
      profilePictRef.current.value = "";
    }
  };

  if (pendingGet) {
    return <Loading />;
  }

  if (!getUser) {
    return <NoData />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/account">
          <Button variant="outline" size="icon" className="my-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Main Content */}
          <div className="md:col-span-3">
            <div>
              <h2 className="mb-1 text-xl font-semibold">Account</h2>
              <p className="mb-6 text-sm text-gray-500">
                Change your account information.
              </p>

              <form className="mt-6 space-y-4" onSubmit={formik.handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {!!formik.touched.fullName && !!formik.errors.fullName && (
                    <p className="text-xs text-red-600">
                      {formik.errors.fullName}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    This is your display name. Please use real name.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Full Name"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {!!formik.touched.email && !!formik.errors.email && (
                    <p className="text-xs text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                  {!!formik.touched.email && !!formik.errors.email && (
                    <p className="text-xs text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    You can manage verified email addresses in your email
                    settings.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={pendingUpdate || !formik.dirty}
                    className="mt-6 bg-blue-800 hover:cursor-pointer hover:bg-blue-700"
                  >
                    {pendingUpdate ? "Loading..." : "Update profile"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
