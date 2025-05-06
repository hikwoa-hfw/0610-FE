import UpdateAccountPage from "@/features/dashboard/account/UpdateAccountPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const UpdateProfile = async () => {
  const session = await auth();

  if (session?.user.role !== "ORGANIZER") {
    return redirect("/login");
  }

  return <div>
    <UpdateAccountPage/>
  </div>;
};

export default UpdateProfile;
