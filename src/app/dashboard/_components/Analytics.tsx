"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
// import { Bar } from "react-chartjs-2";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";



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
export type TotalRevenueType = {
  totalRevenue: number;             // Total revenue collected
  growthRate: string;               // Month-over-month revenue growth (e.g., "12.50")
  trendDirection: "up" | "down";    // Trend direction
  trendMessage: string;             // Friendly message (e.g., "Trending up this month")
};

// 2️⃣ New Customers
export type NewCustomersType = {
  newCustomers: number;             // Number of new customers this month
  growthRate: string;               // Month-over-month growth (e.g., "12.50")
  trendDirection: "up" | "down";    // Trend direction
  trendMessage: string;             // Friendly message (e.g., "Up 12.50% this period")
  note: string;                     // Note describing trend (e.g., "new customers increased compared to last month")
};

// 3️⃣ Active Accounts
export type ActiveAccountsType = {
  activeAccounts: number;           // Total active accounts (completed & not expired)
  growthRate: string;               // Month-over-month growth (e.g., "12.50")
  trendDirection: "up" | "down";    // Trend direction
  note: string;                     // Friendly message describing engagement
};

// 4️⃣ Growth Rate
export type GrowthRateType = {
  growthRate: string;               // Revenue growth percentage (e.g., "4.50")
  trendDirection: "up" | "down";    // Trend direction
  note: string;                     // Note about performance (e.g., "Steady performance increase")
  thisMonthRevenue: number;         // Revenue this month
  lastMonthRevenue: number;         // Revenue last month
};

export function DashboardAnalytics() {

    const [totalRevenue, setTotalRevenue] = useState<TotalRevenueType | null>(null);
  const [newCustomers, setNewCustomers] = useState<NewCustomersType | null>(null);
  const [activeAccounts, setActiveAccounts] = useState<ActiveAccountsType | null>(null);
  const [growthRate, setGrowthRate] = useState<GrowthRateType | null>(null);

 useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const res = await fetch("/api/stats/totalRevenue");
        const data = await res.json();
        setTotalRevenue(data);
      } catch (err) {
        console.error("Error fetching total revenue:", err);
      } finally {
      }
    };
    fetchTotalRevenue();
  }, []);

  // --- Fetch New Customers
  useEffect(() => {
    const fetchNewCustomers = async () => {
      try {
        const res = await fetch("/api/stats/new-customers");
        const data = await res.json();
        setNewCustomers(data);
      } catch (err) {
        console.error("Error fetching new customers:", err);
      } finally {
      }
    };
    fetchNewCustomers();
  }, []);

  // --- Fetch Active Accounts
  useEffect(() => {
    const fetchActiveAccounts = async () => {
      try {
        const res = await fetch("/api/stats/active-accounts");
        const data = await res.json();
        setActiveAccounts(data);
      } catch (err) {
        console.error("Error fetching active accounts:", err);
      } finally {
      }
    };
    fetchActiveAccounts();
  }, []);

  // --- Fetch Growth Rate
  useEffect(() => {
    const fetchGrowthRate = async () => {
      try {
        const res = await fetch("/api/stats/growth-rate");
        const data = await res.json();
        setGrowthRate(data);
      } catch (err) {
        console.error("Error fetching growth rate:", err);
      } finally {
      }
    };
    fetchGrowthRate();
  }, []);

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
   

     
    </div>
  );
};

export default DashboardAnalytics;
