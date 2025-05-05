import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TransactionsManagementPage from "@/features/dashboard/transactions/TransactionsManagementPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Transaction = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  const slug = (await params).slug;

  return (
    <div>
      <TransactionsManagementPage slug={slug}/>
    </div>
  );
};

export default Transaction;
