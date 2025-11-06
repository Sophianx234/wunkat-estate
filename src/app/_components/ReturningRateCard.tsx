"use client";

import { useEffect, useState } from "react";
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
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ReturningRateCard() {
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rateChange, setRateChange] = useState<number | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/dashboard/returning-rate?year=${year}`);
        const data = await res.json();

        setChartData(data);

        const current = data?.datasets?.[0]?.data || [];
        const prev = data?.datasets?.[1]?.data || [];

        const currentTotal = current.reduce((a: number, b: number) => a + b, 0);
        const prevTotal = prev.reduce((a: number, b: number) => a + b, 0);

        if (prevTotal > 0) {
          setRateChange(((currentTotal - prevTotal) / prevTotal) * 100);
        } else setRateChange(null);
      } catch (err) {
        console.error("Error loading returning rate data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [year]);

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
          color: "#374151",
          font: { size: 12, family: "Inter, sans-serif" },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ₵${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6B7280" } },
      y: { display: false, grid: { display: false } },
    },
  };

  const currentTotal =
    chartData?.datasets?.[0]?.data?.reduce((a: number, b: number) => a + b, 0) || 0;

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Returning Rate
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-sm mt-2">Loading...</p>
          ) : (
            <>
              <p className="text-2xl sm:text-3xl font-bold mt-1 text-gray-800">
                GH₵ {currentTotal.toLocaleString()}
              </p>
              {rateChange !== null && (
                <p
                  className={`text-sm sm:text-base font-medium ${
                    rateChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {rateChange >= 0 ? "+" : ""}
                  {rateChange.toFixed(1)}%
                </p>
              )}
            </>
          )}
        </div>

        {/* Year Selector */}
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full sm:w-[120px] border-gray-300 text-sm">
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
      <div className="h-48 sm:h-56 mt-6">
        {chartData ? (
          <Line
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets.map((d: any) => ({
                ...d,
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: d.borderColor,
              })),
            }}
            options={options}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Loading chart...
          </div>
        )}
      </div>
    </div>
  );
}
