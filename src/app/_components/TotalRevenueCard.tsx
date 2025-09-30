"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalRevenueCard() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Desktop",
        data: [12000, 18000, 17000, 10000, 9000, 19000],
        backgroundColor: "#000000", // black
        borderRadius: 6,
        barThickness: 24,
      },
      {
        label: "Mobile",
        data: [11000, 16000, 15000, 12000, 10000, 15000],
        backgroundColor: "#6B7280", // gray
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 ">
      <h2 className="font-semibold text-lg text-gray-800">Total Revenue</h2>
      <p className="text-gray-500 text-sm">Income in the last 28 days</p>

      {/* Stats */}
      <div className="flex gap-6 mt-4 text-center">
        <div className="bg-gray-50 px-4 py-2 rounded-md flex-1">
          <p className="text-xs text-gray-500">DESKTOP</p>
          <p className="text-2xl font-bold text-gray-800">24,828</p>
        </div>
        <div className="bg-gray-50 px-4 py-2 rounded-md flex-1">
          <p className="text-xs text-gray-500">MOBILE</p>
          <p className="text-2xl font-bold text-gray-800">25,010</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 mt-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
