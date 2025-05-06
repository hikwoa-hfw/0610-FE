"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useGetEventsByOrganizer from "@/hooks/api/events/useGetEventsByOrganizer";

import { useRouter } from "next/navigation";
import { FC } from "react";
import EditEventForm from "./components/EditEventForm";

interface EditEventPageProps {
  slug: string;
}

const EditEventPage: FC<EditEventPageProps> = ({ slug }) => {
  const router = useRouter();
  const { data: events, isPending } = useGetEventsByOrganizer();

  console.log("events", events);

  const handleRowClick = (slug: string) => {
    router.push(`/dashboard/events/edit/${slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {isPending ? (
          <Loading />
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold md:text-4xl">
                    Edit Your Events
                  </h2>
                  <p className="text-muted-foreground">
                    Manage or edit your events by clicking on the list.
                  </p>
                </div>
                <EditEventForm slug={slug} />
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default EditEventPage;
