import AttendeesPage from "@/features/dashboard/attendees/AttendeesPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Attendees = async ({
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
      <AttendeesPage slug={slug}/>
    </div>
  );
};

export default Attendees;
