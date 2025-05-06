"use client";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useGetUser from "@/hooks/api/user/useGetUser";
import { format } from "date-fns";
import { Building, Calendar, CreditCard, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AccountDetail() {
  const { data: user, isPending } = useGetUser();

  if (isPending) {
    return <Loading />;
  }

  if (!user) {
    return <NoData />;
  }

  // Format the date for display
  const joinedDate = format(new Date(user.createdAt!), "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Account</h1>
            <p className="text-gray-500">View your account information.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="space-y-8">
                {/* User Profile Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      {/* Square Avatar */}
                      <div className="relative h-32 w-32 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={user.profilePict || "/placeholder.svg"}
                          alt={user.fullName}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h2 className="mb-1 text-2xl font-bold">
                          {user.fullName || "User Name"}
                        </h2>

                        {/* Role Badge */}
                        <Badge className="mb-3 border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-100">
                          {user.role}
                        </Badge>

                        {/* Joined Date */}
                        <div className="mb-4 flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          Joined Vibration Inc. as Event Organizer on{" "}
                          {joinedDate}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-gray-600">
                            {user.email || "No email provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Phone Number</p>
                          <p className="text-gray-600">
                            {user.phoneNumber || "No phone number provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      Banking Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Bank Name</p>
                          <p className="text-gray-600">
                            {user.bankName || "No bank name provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Bank Account</p>
                          <p className="text-gray-600">
                            {user.bankAccount || "No bank account provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Link href="/dashboard/account/update">
                    <Button className="bg-blue-800 hover:cursor-pointer hover:bg-blue-700">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
