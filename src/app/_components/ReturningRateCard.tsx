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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, // ✅ Add this import
} from "@/components/ui/select";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ReturningRateCard() {
  const data = {
    labels: [
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "October",
      "December",
    ],
    datasets: [
      {
        label: "Monthly rent revenue for 2025",
        data: [20000, 22000, 25000, 18000, 24000, 23000, 22000, 30000],
        borderColor: "#000000",
        backgroundColor: "#000000",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#000000",
      },
      {
        label: "Monthly rent revenue for 2024",
        data: [15000, 18000, 19000, 17000, 18000, 19000, 21000, 23000],
        borderColor: "#9CA3AF",
        backgroundColor: "#9CA3AF",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#9CA3AF",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          boxWidth: 30,
          color: "#374151",
          padding: 20,
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.parsed.y.toLocaleString();
            return `${context.dataset.label}: ₵${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg text-gray-800">Returning Rate</h2>
          <p className="text-2xl font-bold mt-2">₵42,379</p>
          <p className="text-green-600 text-sm font-medium">+2.5%</p>
        </div>

        {/* ✅ Fixed Select dropdown */}
        <Select defaultValue="2025">
          <SelectTrigger className="w-[100px] border px-3 py-1 rounded-md text-sm">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="h-48 mt-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
