"use client";

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Home } from "lucide-react";
import BalanceCard from "../finance/BalanceCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const stats = [
  { title: "No. of Properties", value: 5467, change: -3.22, icon: Home },
  { title: "Regi. Agents", value: 607, change: +5.54, icon: Users },
  { title: "Customers", value: 5467, change: -2.33, icon: Users },
  { title: "Revenue", value: 5467, change: +4.25, icon: DollarSign },
];

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

const DashboardAnalytics: FC = () => {
  return (
    <div className="grid gap-6 mb-3">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 border"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <h4 className="text-sm text-muted-foreground">{stat.title}</h4>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <span
                  className={`text-sm font-medium ${
                    stat.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change > 0 ? `+${stat.change}%` : `${stat.change}%`}
                </span>
              </div>
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Income Analytics */}
      <div className="grid grid-cols-[4fr_1fr] gap-4">
        <Card className="rounded-2xl shadow-md border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Income Analytics</h3>
            <div className="h-[300px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        <BalanceCard />
      </div>
    </div>
  );
};

export default DashboardAnalytics;
