"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
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

import { CalendarDays, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventsListPage() {
  const router = useRouter();
  const { data: events, isPending } = useGetEventsByOrganizer();

  const handleRowClick = (slug: string) => {
    router.push(`/dashboard/transactions/${slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if(isPending){
    <Loading/>
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold">Events</h2>
                <p className="text-muted-foreground">Manage your events by clicking on the list.</p>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                    {events && events.length > 0 ? (
                      events.map((event) => (
                        <TableRow
                          key={event.id}
                          className="hover:bg-muted/50 cursor-pointer"
                          onClick={() => handleRowClick(event.slug)}
                        >
                          <TableCell className="font-medium">
                            {event.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="text-muted-foreground h-4 w-4" />
                              {event.locationDetail}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <CalendarDays className="text-muted-foreground h-4 w-4" />
                              {formatDate(event.startDate)}
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(event.endDate)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.category}</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="py-6 text-center">
                          No events found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
