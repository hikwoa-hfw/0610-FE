import TransactionsManagementPage from "@/features/dashboard/transactions/TransactionsManagementPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Transaction = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  
  if (!session) return redirect("/login");
  if (session.user.role !== "ORGANIZER") redirect("/");

  const slug = (await params).slug;

  return (
    <div>
      <TransactionsManagementPage slug={slug}/>
    </div>
  );
};

export default Transaction;
