"use client";

import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ActivityAnalytics() {
  const [loading, setLoading] = useState(true);

  // ⏱ Simulate data fetch
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // 🧩 Mock Data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const bookingsData = [45, 52, 60, 49, 80, 75, 92, 105, 98, 110];
  const revenueData = [1200, 1350, 1500, 1400, 1650, 1750, 1800, 2100, 1950, 2200];
  const housesAddedData = [2, 3, 5, 1, 4, 6, 4, 7, 5, 8];

  // 🎨 Chart Data Configs
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#9CA3AF" } },
    },
    scales: {
      x: { ticks: { color: "#9CA3AF" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#9CA3AF" }, grid: { color: "rgba(255,255,255,0.05)" } },
    },
  };

  const bookingsConfig = {
    labels: months,
    datasets: [
      {
        label: "Bookings",
        data: bookingsData,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueConfig = {
    labels: months,
    datasets: [
      {
        label: "Revenue (₵)",
        data: revenueData,
        borderColor: "#22C55E",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const housesConfig = {
    labels: months,
    datasets: [
      {
        label: "Houses Added",
        data: housesAddedData,
        backgroundColor: "rgba(249,115,22,0.6)",
      },
    ],
  };

  return (
    <div className="space-y-6 mb-3 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Activity & Performance Analytics
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 📈 Bookings Trend */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Monthly Room Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px]" />
            ) : (
              <Line options={lineOptions} data={bookingsConfig} height={250} />
            )}
          </CardContent>
        </Card>

        {/* 💸 Revenue Trend */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[250px]" />
            ) : (
              <Line options={lineOptions} data={revenueConfig} height={250} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* 🏠 Houses Added per Month */}
   

    </div>
  );
}
