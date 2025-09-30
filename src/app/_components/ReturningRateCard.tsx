"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ArrowUpRight } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ReturningRateCard() {
  const data = {
    labels: ["March", "April", "May", "June", "July", "August", "October", "December"],
    datasets: [
      {
        label: "Current",
        data: [20000, 22000, 25000, 18000, 24000, 23000, 22000, 30000],
        borderColor: "#000000",
        backgroundColor: "#000000",
        tension: 0.4,
      },
      {
        label: "Previous",
        data: [15000, 18000, 19000, 17000, 18000, 19000, 21000, 23000],
        borderColor: "#9CA3AF",
        backgroundColor: "#9CA3AF",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 ">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg text-gray-800">Returning Rate</h2>
          <p className="text-2xl font-bold mt-2">$42,379</p>
          <p className="text-green-600 text-sm font-medium">+2.5%</p>
        </div>
        <button className="border px-3 py-1 rounded-md text-sm flex items-center gap-1">
          <ArrowUpRight className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Chart */}
      <div className="h-44 mt-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
