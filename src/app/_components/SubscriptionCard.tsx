"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Tooltip,
  LinearScale
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SubscriptionCard() {
  // ✅ Chart data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Current",
        data: [10, 20, 15, 30, 25, 40, 22],
        backgroundColor: "#868e96",
        borderRadius: 6,
        barThickness: 12,
      },
      {
        label: "Previous",
        data: [12, 15, 20, 18, 22, 25, 30],
        backgroundColor: "#000",
        borderRadius: 6,
        barThickness: 12,
      },
    ],
  };

  // ✅ Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
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
        <CardTitle className="text-3xl font-bold text-gray-900">+2350</CardTitle>
        <p className="text-green-500 text-sm">+180.1% from last month</p>
      </CardHeader>

      <CardContent>
        <div className="h-40">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
