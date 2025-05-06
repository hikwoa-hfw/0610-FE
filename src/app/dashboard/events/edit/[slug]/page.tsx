import EditEventPage from "@/features/dashboard/events/EditEventPage";
import TransactionsManagementPage from "@/features/dashboard/transactions/TransactionsManagementPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const EditEvent = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
    const session = await auth();

    if (session?.user.role !== "ORGANIZER") {
      return redirect("/login");
    }

  const slug = (await params).slug;

  return (
    <div>
      <EditEventPage slug={slug}/>
    </div>
  );
};

export default EditEvent;
