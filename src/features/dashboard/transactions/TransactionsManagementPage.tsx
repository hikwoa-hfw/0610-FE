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
import { ArrowLeft, Banknote, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface TransactionsManagementPageProps {
  slug: string;
}

const TransactionsManagementPage: FC<TransactionsManagementPageProps> = ({
  slug,
}) => {
  const router = useRouter();
  const { data: transactions, isPending } = useGetTransactionsByEventSlug(slug);
  console.log(transactions);

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

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Hilangkan desimal
    maximumFractionDigits: 0, // Pastikan tidak ada angka di belakang koma
  });

  if (isPending) {
    return <Loading />;
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
                <Link href="/dashboard/transactions">
                  <Button variant="outline" size="icon" className="my-2">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h2 className="text-2xl font-bold md:text-4xl">Transaction</h2>
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
                          //   onClick={() => handleRowClick(transaction.slug)}
                        >
                          <TableCell className="font-medium">
                            {transaction.uuid}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline">
                                {transaction.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {/* <Banknote className="text-muted-foreground h-4 w-4" /> */}
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
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TransactionsManagementPage;
