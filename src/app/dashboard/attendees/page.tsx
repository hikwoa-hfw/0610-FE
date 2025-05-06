// import TransactionPage from '@/features/dashboard/events-transactions/TransactionsPage'
import EventAttendeesPage from "@/features/dashboard/attendees/EventAttendeesPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const EventsAttendees = async () => {
  const session = await auth();
  
  if (!session) return redirect("/login");
  if (session.user.role !== "ORGANIZER") redirect("/");

  return (
    <div>
      <EventAttendeesPage />
    </div>
  );
};

export default EventsAttendees;
