"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Added Button import
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetEventsByOrganizer from "@/hooks/api/events/useGetEventsByOrganizer";

import { CalendarDays, MapPin, Plus } from "lucide-react"; // Added Plus icon
import { useRouter } from "next/navigation";
import AccountDetail from "./components/AccountDetail";

export default function AccountPage() {
  const router = useRouter();
  const { data: events, isPending } = useGetEventsByOrganizer();

  console.log("events", events);

  const handleRowClick = (slug: string) => {
    router.push(`/dashboard/events/edit/${slug}`);
  };

  const handleCreateEvent = () => {
    router.push("/dashboard/events/create");
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
                  <AccountDetail/>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
