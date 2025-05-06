"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Loading from "@/components/Loading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetTransactionsByEventSlug from "@/hooks/api/transactions/useGetTransactionsByEventSlug";
import useGetAttendees from "@/hooks/api/user/useGetAttendees";
import { ArrowLeft, Banknote, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import ModalDetailTransaction from "./components/ModalDetailTransaction";

interface TransactionsManagementPageProps {
  slug: string;
}

const AttendeesPage: FC<TransactionsManagementPageProps> = ({ slug }) => {
  const router = useRouter();
  const { data: attendees, isPending } = useGetAttendees(slug);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRowClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Hilangkan desimal
    maximumFractionDigits: 0, // Pastikan tidak ada angka di belakang koma
  });

  

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
                <Link href="/dashboard/attendees">
                  <Button variant="outline" size="icon" className="my-2">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>

                <h2 className="text-2xl font-bold md:text-4xl">
                  Attendees List on {attendees?.data[0]?.events?.name || "N/A"}
                </h2>

                <p className="text-muted-foreground">
                  View your attendees detail by clicking on the list.
                </p>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="grid-cols-3 justify-items-center">
                      <TableHead>Name</TableHead>
                      <TableHead>Transaction UUID</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendees && attendees.data.length > 0 ? (
                      attendees.data.map((attendee) => (
                        <TableRow
                          key={attendee.id}
                          className="hover:bg-muted/50 cursor-pointer"
                          onClick={() => handleRowClick(attendee)}
                        >
                          <TableCell className="font-medium">
                            {attendee.users.fullName}
                          </TableCell>
                          <TableCell className="font-medium">
                            {attendee.uuid}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline">
                                {attendee.transaction_details?.reduce(
                                  (total: number, detail: any) =>
                                    total + detail.qty,
                                  0,
                                )}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {formatter.format(attendee.totalPrice)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="py-6 text-center">
                          No transactions found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {selectedTransaction && (
                  <ModalDetailTransaction
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    transaction={selectedTransaction}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AttendeesPage;
