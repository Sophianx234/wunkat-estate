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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SubscriptionCard() {
  // ✅ Chart data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Current",
        data: [10, 20, 15, 30, 25, 40, 22],
        backgroundColor: "#3B82F6", // blue
        borderRadius: 6,
        barThickness: 12,
      },
      {
        label: "Previous",
        data: [12, 15, 20, 18, 22, 25, 30],
        backgroundColor: "#10B981", // green
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
    <div className=" rounded-xl p-6 shadow-md w-full max-w-sm">
      {/* Header Text */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Subscriptions</p>
        <h2 className=" text-black text-3xl font-bold">+2350</h2>
        <p className="text-green-400 text-sm">+180.1% from last month</p>
      </div>

      {/* Chart */}
      <div className="h-40">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
