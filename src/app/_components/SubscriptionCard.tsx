"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Tooltip,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SubscriptionCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/dashboard/subscriptions");
      const json = await res.json();
      if (json.success) setData(json.data);
    }
    fetchStats();
  }, []);

  if (!data)
    return (
      <Card className="w-full max-w-sm p-6 rounded-xl animate-pulse bg-neutral-100 dark:bg-neutral-900 h-[280px]" />
    );

  // ✅ All month labels
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // ✅ Determine which 6 months to show
  const currentMonth = new Date().getMonth(); // 0-based (0 = Jan)
  const showSecondHalf = currentMonth >= 6; // July (6) or later
  const startIndex = showSecondHalf ? 6 : 0;
  const endIndex = showSecondHalf ? 12 : 6;

  const visibleLabels = allMonths.slice(startIndex, endIndex);
  const visibleCurrent = data.currentYearData.slice(startIndex, endIndex);
  const visiblePrevious = data.previousYearData.slice(startIndex, endIndex);

  // 🧮 Prepare chart data (same structure)
  const chartData = {
    labels: visibleLabels,
    datasets: [
      {
        label: "Current",
        data: visibleCurrent,
        backgroundColor: "#000",
        borderRadius: 6,
        barThickness: 12,
      },
      {
        label: "Previous",
        data: visiblePrevious,
        backgroundColor: "#868e96",
        borderRadius: 6,
        barThickness: 12,
      },
    ],
  };

  // 🧾 Chart options (same as before)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: "#9CA3AF" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#9CA3AF" },
      },
    },
  };

  return (
    <Card className="w-full max-w-sm shadow-sm hover:shadow-md transition rounded-xl">
      <CardHeader>
        <CardDescription>Subscriptions</CardDescription>
        <CardTitle className="text-3xl font-bold text-gray-900">
          +{data.totalThisYear}
        </CardTitle>
        <p
          className={`text-sm ${
            parseFloat(data.growthRate) >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {data.growthRate}% from last year
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-40">
          <Bar data={chartData} options={options} />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Showing {visibleLabels[0]} – {visibleLabels[visibleLabels.length - 1]}
        </p>
      </CardContent>
    </Card>
  );
}
