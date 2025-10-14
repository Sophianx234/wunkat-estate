"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Info, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils"; // optional utility if you use shadcn

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

interface StatCardProps {
  title: string;
  value: number;
  trendData: number[];
  trendLabel?: string;
  changePercent: number;
}

export default function StatCard({
  title,
  value,
  trendData,
  trendLabel = "Since last week",
  changePercent,
}: StatCardProps) {
  const isPositive = changePercent >= 0;

  const data = {
    labels: trendData.map((_, i) => i.toString()),
    datasets: [
      {
        data: trendData,
        borderColor: isPositive ? "#22C55E" : "#EF4444",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start">
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        <Info size={16} className="text-gray-400 cursor-pointer" />
      </div>

      {/* Value */}
      <h2 className="text-3xl font-bold mt-2">{value.toLocaleString()}</h2>

      {/* Chart */}
      <div className="h-10 mt-2">
        <Line data={data} options={options} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">{trendLabel}</p>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight size={14} className="text-green-500" />
          ) : (
            <ArrowDownRight size={14} className="text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-600" : "text-red-500"
            )}
          >
            {Math.abs(changePercent).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
