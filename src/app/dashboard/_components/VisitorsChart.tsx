"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useIsMobile } from "@/lib/useMobile"

export const description = "An interactive area chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  thisYear: {
    label: "This Year",
    color: "#228be6", // blue
  },
  lastYear: {
    label: "Last Year",
    color: "#be4bdb", // purple
  },
} satisfies ChartConfig

export function VisitorsChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const [data, setData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  // 📱 Auto-set to 7d for mobile
  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  // 🧩 Fetch visitor data (for the whole year)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard/visitors")
        if (!res.ok) throw new Error("Failed to fetch data")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Failed to fetch visitor insights:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 🧮 Filter data by selected time range (client-side)
  const filteredData = React.useMemo(() => {
    if (!data.length) return []

    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(referenceDate.getDate() - daysToSubtract)

    return data
      .filter((item) => new Date(item.date) >= startDate)
      .map((item) => ({
        date: item.date,
        thisYear: item.thisYear || item.desktop || 0,
        lastYear: item.lastYear || item.mobile || 0,
      }))
  }, [data, timeRange])

  // ⏳ Loading state
  if (loading) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>Loading visitor data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px]">
          <div className="animate-pulse text-muted-foreground">
            Fetching data...
          </div>
        </CardContent>
      </Card>
    )
  }

  // 📊 Chart
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the selected period
          </span>
          <span className="@[540px]/card:hidden">Visitors trend</span>
        </CardDescription>
        <CardAction>
          {/* 🖥️ Desktop toggle buttons */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          {/* 📱 Mobile select dropdown */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a range"
            >
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
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
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillThisYear" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-thisYear)"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-thisYear)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLastYear" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-lastYear)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-lastYear)"
                  stopOpacity={0.1}
                />
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
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="lastYear"
              type="natural"
              fill="url(#fillLastYear)"
              stroke="var(--color-lastYear)"
              stackId="a"
            />
            <Area
              dataKey="thisYear"
              type="natural"
              fill="url(#fillThisYear)"
              stroke="var(--color-thisYear)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
