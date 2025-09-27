"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
// import { Bar } from "react-chartjs-2";
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BalanceCard from "../finance/BalanceCard";



const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Income",
      data: [4000, 3000, 5000, 4780, 5720],
      backgroundColor: "#3b82f6", // green-400
      borderRadius: 8,
      barThickness: 35,
    },
    {
      label: "Expenses",
      data: [2400, 1398, 2210, 2290, 2720],
      backgroundColor: "#8b5cf6", // red-400
      borderRadius: 8,
      barThickness: 35,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    tooltip: {
      backgroundColor: "white",
      titleColor: "#111827",
      bodyColor: "#374151",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      padding: 8,
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(229,231,235,0.6)",
        borderDash: [3, 3],
      },
      ticks: {
        color: "#6b7280",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#6b7280",
      },
    },
  },
};
export function DashboardAnalytics() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6  *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
   

      {/* Income Analytics */}
      <div className="grid grid-cols-[4fr_1fr] gap-4">
        <Card className="rounded-2xl shadow-md border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Income Analytics</h3>
            <div className="h-[300px]">
              {/* <Bar data={chartData} options={chartOptions} /> */}
            </div>
          </CardContent>
        </Card>
        <BalanceCard />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
