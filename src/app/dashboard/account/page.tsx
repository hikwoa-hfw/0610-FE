import AccountPage from "@/features/dashboard/account/AccountPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  const session = await auth();

  if (!session) return redirect("/login");
  if (session.user.role !== "ORGANIZER") redirect("/");
  
  return (
    <div>
      <AccountPage />
    </div>
  );
};

export default Account;
