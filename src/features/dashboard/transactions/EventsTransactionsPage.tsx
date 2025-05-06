"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import PaginationSection from "@/components/Pagination";
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
import { parseAsInteger, useQueryState } from "nuqs";

export default function EventsTransactionsPage() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data: events, isPending } = useGetEventsByOrganizer({
    page,
    take: 10,
  });
  const router = useRouter();

  console.log("events", events);

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

  if (isPending) {
    <Loading />;
  }

  const onChangePage = (page: number) => {
    setPage(page);
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
                    Transaction
                  </h2>
                  <p className="text-muted-foreground">
                    Manage your events transactions by clicking on the list.
                  </p>
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
                      {events && events.data.length > 0 ? (
                        events.data.map((event) => (
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
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <CalendarDays className="text-muted-foreground h-4 w-4" />
                                {formatDate(event.endDate)}
                              </div>
                            </TableCell>
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
        )}
        {events && events.data.length > 0 && (
          <div className="mb-10">
            <PaginationSection
              onChangePage={onChangePage}
              page={events.meta.page}
              total={events.meta.total}
              take={events.meta.take}
            />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
