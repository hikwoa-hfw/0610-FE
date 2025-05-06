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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import ModalDetailTransaction from "./components/ModalDetailTransaction";

interface TransactionsManagementPageProps {
  slug: string;
}

const TransactionsManagementPage: FC<TransactionsManagementPageProps> = ({
  slug,
}) => {
  const { data: transactions, isPending } = useGetTransactionsByEventSlug(slug);
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
                  <Link href="/dashboard/transactions">
                    <Button variant="outline" size="icon" className="my-2">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
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
                      <TableRow className="grid-cols-3 justify-items-center">
                        <TableHead>UUID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions && transactions.data.length > 0 ? (
                        transactions.data.map((transaction) => (
                          <TableRow
                            key={transaction.id}
                            className="hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleRowClick(transaction)}
                          >
                            <TableCell className="font-medium">
                              {transaction.uuid}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    transaction?.status === "PAID"
                                      ? "bg-green-500 text-white hover:bg-green-500"
                                      : transaction?.status === "REJECT"
                                        ? "bg-red-500 text-white hover:bg-red-500"
                                        : "bg-gray-200 text-black hover:bg-gray-300"
                                  }
                                >
                                  {transaction.status}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {formatter.format(transaction.totalPrice)}
                              </div>
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

export default TransactionsManagementPage;
