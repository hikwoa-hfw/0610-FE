"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetEventsCount from "@/hooks/api/events/useGetEventsCount";
import useGetTransactionsPaid from "@/hooks/api/transactions/useGetTransactionPaid";
import useGetTransactionRevenue from "@/hooks/api/transactions/useGetTransactionRevenue";
import { Loader2 } from "lucide-react";
import SkeletonCard from "./SkeletonCard";

export const SectionCards = () => {
  const { data: customer, isPending: pendingTransaction } =
    useGetTransactionsPaid();
  const { data: event, isPending: pendingEvent } = useGetEventsCount();
  const { data: revenue, isPending: pendingRevenue } =
    useGetTransactionRevenue();
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  });

  if (pendingTransaction || pendingEvent || pendingRevenue) {
    return (
        <SkeletonCard />
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl">Total Revenue</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {revenue?.totalPrice
              ? formatter.format(revenue.totalPrice)
              : "Rp 0"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Aggregate revenue from all events organized by you.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl">Total Customer</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {customer?.meta.total}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total number of customers recorded in the system.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl">Total Events</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-4xl">
            {event?.meta.total}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total events managed.</div>
        </CardFooter>
      </Card>
    </div>
  );
};
