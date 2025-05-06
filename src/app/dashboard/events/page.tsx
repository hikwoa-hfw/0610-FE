// import TransactionPage from '@/features/dashboard/events-transactions/TransactionsPage'
import EventsListPage from "@/features/dashboard/events/EventsListPage";
import EventsTransactionsPage from "@/features/dashboard/transactions/EventsTransactionsPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Events = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div>
      <EventsListPage />
    </div>
  );
};

export default Events;
