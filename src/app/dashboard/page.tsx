import DashboardPage from "@/features/dashboard/DashboardPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await auth();
  
  if (!session) return redirect("/login");
  if (session.user.role !== "ORGANIZER") redirect("/");
  
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
