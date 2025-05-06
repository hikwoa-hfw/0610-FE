import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateEvent = async () => {
  const session = await auth();
  
  if (!session) return redirect("/login");
  if (session.user.role !== "ORGANIZER") redirect("/");
  return (
    <div>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />

          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
                create event
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default CreateEvent;
