// import TransactionPage from '@/features/dashboard/events-transactions/TransactionsPage'
import EventsTransactionsPage from "@/features/dashboard/transactions/EventsTransactionsPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const EventsTransactions = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div>
      <EventsTransactionsPage />
    </div>
  );
};

export default EventsTransactions;
