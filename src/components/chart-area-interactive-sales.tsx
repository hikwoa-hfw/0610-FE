"use client"

import React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useIsMobile } from "@/hooks/use-mobile"

// Type definitions
type Transaction = {
  id: number
  uuid: string
  status: string
  paymentProof: string | null
  pointAmount: number
  voucherAmount: number
  couponAmount: number
  totalPrice: number
  voucherId: string | null
  couponId: string | null
  userId: number
  eventId: number
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
}

type ChartConfig = {
  [key: string]: {
    label: string
    color?: string
  }
}

// Sample backend data
const backendData: Transaction[] = [
  {
    id: 1,
    uuid: "13492d4c-cc71-4fd3-8f20-e6fac9aa2493",
    status: "PAID",
    paymentProof: null,
    pointAmount: 20000,
    voucherAmount: 0,
    couponAmount: 0,
    totalPrice: 900000,
    voucherId: null,
    couponId: null,
    userId: 2,
    eventId: 1,
    createdAt: new Date("2025-05-01T11:59:37.541Z"),
    updatedAt: new Date("2025-05-02T02:51:18.836Z"),
    deletedAt: null,
  },
  {
    id: 2,
    uuid: "372852c4-e803-4c18-8620-cbf36b0ac14f",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 400000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 4,
    eventId: 1,
    createdAt: new Date("2025-05-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-05-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-05-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-05-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-05-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-05-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-04-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-04-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
  {
    id: 3,
    uuid: "372852c4-e803-4c18-8620-cbf36basdasda",
    status: "PAID",
    paymentProof: null,
    pointAmount: 0,
    voucherAmount: 2000,
    couponAmount: 5000,
    totalPrice: 450000,
    voucherId: "2db1fda2-04c1-466c-8346-385cd9a3f629",
    couponId: "23dbdb09-05e8-4884-9e3e-d5989bfe2f76",
    userId: 3,
    eventId: 1,
    createdAt: new Date("2025-04-02T02:55:09.933Z"),
    updatedAt: new Date("2025-05-02T03:28:17.888Z"),
    deletedAt: null,
  },
]

// Chart configuration
const chartConfig = {
  transactions: {
    label: "Transactions",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractiveSales() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("12m")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // Generate date range for the chart (last 12 months)
  const generateDateRange = () => {
    const today = new Date()
    const dates = []

    // Generate dates for the last 12 months
    for (let i = 365; i >= 0; i--) {
      const date = new Date()
      date.setDate(today.getDate() - i)

      // Format date as YYYY-MM-DD
      const formattedDate = date.toISOString().split("T")[0]
      dates.push({
        date: formattedDate,
        transactions: 0,
      })
    }

    return dates
  }

  // Process backend data to count transactions by date
  const processTransactionData = () => {
    // Generate empty date range
    const dateData = generateDateRange()

    // Create a map for quick lookup
    const dateMap = new Map(dateData.map((item) => [item.date, item]))

    // Count paid transactions by date
    backendData.forEach((transaction) => {
      if (transaction.status === "PAID") {
        const date = new Date(transaction.createdAt)
        const formattedDate = date.toISOString().split("T")[0]

        if (dateMap.has(formattedDate)) {
          const entry = dateMap.get(formattedDate)
          if (entry) {
            // Count the transaction regardless of its value
            entry.transactions += 1
          }
        }
      }
    })

    // Convert map back to array and ensure sorted by date
    return Array.from(dateMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  // Get processed transaction data
  const allTransactionData = processTransactionData()

  // Filter data based on selected time range
  const getFilteredData = () => {
    const today = new Date()
    let daysToSubtract = 365 // 12 months

    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return allTransactionData.filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate
    })
  }

  const filteredData = getFilteredData()

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Sales</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {timeRange === "12m" ? "Total for the last year" : timeRange === "30d" ? "Last 30 days" : "Last 7 days"}
          </span>
          <span className="@[540px]/card:hidden">
            {timeRange === "12m" ? "Last year" : timeRange === "30d" ? "Last 30 days" : "Last 7 days"}
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
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="0">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
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
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="transactions"
              type="natural"
              fill="url(#fillTransactions)"
              stroke="var(--primary)"
              strokeWidth={2}
              connectNulls={true}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
