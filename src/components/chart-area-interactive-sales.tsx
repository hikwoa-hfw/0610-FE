"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useGetTransactionsPaidNoPage from "@/hooks/api/transactions/useGetTransactionPaidNoPage";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState, useEffect, useRef } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

type ChartConfig = {
  [key: string]: {
    label: string;
    color?: string;
  };
};

// Chart configuration
const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractiveSales() {
  const { data: tx, isPending } = useGetTransactionsPaidNoPage();
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("12m");
  const [chartWidth, setChartWidth] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Update time range based on device
  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile]);

  // Resize observer for responsive sizing
  useEffect(() => {
    if (chartContainerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setChartWidth(entry.contentRect.width);
        }
      });
      
      resizeObserver.observe(chartContainerRef.current);
      
      return () => {
        if (chartContainerRef.current) {
          resizeObserver.unobserve(chartContainerRef.current);
        }
      };
    }
  }, []);

  // Generate date range for the chart (last 12 months)
  const generateDateRange = () => {
    const today = new Date();
    const dates = [];

    // Generate dates for the last 12 months
    for (let i = 365; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      // Format date as YYYY-MM-DD
      const formattedDate = date.toISOString().split("T")[0];
      dates.push({
        date: formattedDate,
        transactions: 0,
      });
    }

    return dates;
  };

  // Process backend data to count transactions by date
  const processTransactionData = () => {
    if (!tx || tx.length === 0) {
      return generateDateRange();
    }
    // Generate empty date range
    const dateData = generateDateRange();

    // Create a map for quick lookup
    const dateMap = new Map(dateData.map((item) => [item.date, item]));

    // Count paid transactions by date
    tx?.forEach((transaction) => {
      if (transaction.status === "PAID") {
        const date = new Date(transaction.createdAt);
        const formattedDate = date.toISOString().split("T")[0];
        if (dateMap.has(formattedDate)) {
          const entry = dateMap.get(formattedDate);
          if (entry) {
            entry.transactions += 1;
          }
        }
      }
    });

    return Array.from(dateMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  };

  // Get processed transaction data
  const allTransactionData = processTransactionData();

  // Filter data based on selected time range
  const getFilteredData = () => {
    const today = new Date();
    let daysToSubtract = 365; // 12 months

    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return allTransactionData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate;
    });
  };

  const filteredData = getFilteredData();

  // Calculate appropriate tick gap based on time range and container width
  const getMinTickGap = () => {
    if (isMobile) {
      return timeRange === "7d" ? 20 : 40;
    } else {
      return timeRange === "7d" ? 24 : timeRange === "30d" ? 48 : 64;
    }
  };

  return (
    <Card className="@container/card w-full">
      <CardHeader>
        <CardTitle>Sales</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {timeRange === "12m"
              ? "Total for the last year"
              : timeRange === "30d"
                ? "Last 30 days"
                : "Last 7 days"}
          </span>
          <span className="@[540px]/card:hidden">
            {timeRange === "12m"
              ? "Last year"
              : timeRange === "30d"
                ? "Last 30 days"
                : "Last 7 days"}
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="12m">Last year</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a time range"
            >
              <SelectValue placeholder="Last year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12m" className="rounded-lg">
                Last year
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent 
        className="px-2 pt-4 sm:px-6 sm:pt-6" 
        ref={chartContainerRef}
      >
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                vertical={false} 
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.1)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={getMinTickGap()}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  // More compact format for mobile
                  return isMobile 
                    ? date.toLocaleDateString("en-US", { 
                        month: "numeric", 
                        day: "numeric" 
                      })
                    : date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[0, "auto"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={30}
                tickCount={5}
                // Dynamic number of ticks based on available height
                interval="preserveStartEnd"
              />
              <ChartTooltip
                cursor={false}
                defaultIndex={isMobile ? -1 : 10}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="transactions"
                type="monotone"
                fill="url(#fillTransactions)"
                fillOpacity={1}
                stroke="var(--primary)"
                strokeWidth={2}
                connectNulls={true}
                baseLine={0}
                isAnimationActive={!isMobile}
                animationDuration={1500}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                  fill: "var(--primary)",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}