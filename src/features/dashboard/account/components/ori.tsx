"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useGetUser from "@/hooks/api/user/useGetUser";
import useUpdateUser from "@/hooks/api/user/useUpdateUser";
import { getChangedValues } from "@/utils/getChangedValue";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { ChangeEvent, useRef, useState } from "react";

export default function UpdateProfileForm() {
  const { data: getUser, isPending: pendingGet } = useGetUser();
  const { data: updateUser, isPending: pendingUpdate } = useUpdateUser();
  const session = useSession();

  const initialValues = {
    fullName: getUser?.fullName || "",
    bankAccount: getUser?.bankAccount || "",
    bankName: getUser?.bankName || "",
    phoneNumber: getUser?.phoneNumber || "",
    email: getUser?.email || "",
    profilePict: null,
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
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto p-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-1 text-xl font-semibold">Edit Account</h2>
                  <p className="mb-6 text-sm text-gray-500">
                    Change your account information.
                  </p>

                  <div className="space-y-6">
                    {/* Username */}
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        Username
                      </label>
                      <Input
                        id="username"
                        defaultValue="shadcn"
                        className="border-gray-200 bg-white"
                      />
                      <p className="text-sm text-gray-500">
                        This is your public display name. It can be your real
                        name or a pseudonym. You can only change this once every
                        30 days.
                      </p>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-200 bg-white">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email1">
                            email@example.com
                          </SelectItem>
                          <SelectItem value="email2">
                            another@example.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        You can manage verified email addresses in your email
                        settings.
                      </p>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        defaultValue="I own a computer."
                        className="min-h-[80px] border-gray-200 bg-white"
                      />
                      <p className="text-sm text-gray-500">
                        You can @mention other users and organizations to link
                        to them.
                      </p>
                    </div>

                    {/* URLs */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">URLs</label>
                      <p className="text-sm text-gray-500">
                        Add links to your website, blog, or social media
                        profiles.
                      </p>
                      <div className="space-y-2">
                        <Input
                          defaultValue="https://shadcn.com"
                          className="border-gray-200 bg-white"
                        />
                        <Input
                          defaultValue="http://twitter.com/shadcn"
                          className="border-gray-200 bg-white"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add URL
                      </Button>
                    </div>

                    <Button className="mt-6">Update profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
