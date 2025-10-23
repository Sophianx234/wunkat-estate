"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface RevenueData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
    barThickness: number;
  }[];
  totals: {
    smart: number;
    manual: number;
  };
}

export default function TotalRevenueCard() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>(String(currentYear));
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRevenue = async (selectedYear: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/total-revenue?year=${selectedYear}`);
      const json = await res.json();
      if (res.ok) {
        console.log("Fetched revenue:", json);
        setData(json);
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue(year);
  }, [year]);

  const chartData = data
    ? {
        labels: data.labels,
        datasets: data.datasets,
      }
    : null;

  const totalSmart = data?.totals.smart ?? 0;
  const totalManual = data?.totals.manual ?? 0;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg text-gray-800">Total Revenue</h2>
          <p className="text-gray-500 text-sm">Income in the last 6 months</p>
        </div>

        {/* Year Selector */}
        <Select onValueChange={setYear} defaultValue={String(currentYear)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      {loading || !data ? (
        <>
          <div className="flex gap-6 mt-4 text-center">
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
          <div className="h-44 mt-6">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-6 mt-4 text-center">
            <div className="bg-gray-50 px-4 py-2 rounded-md flex-1">
              <p className="text-xs text-gray-500">Smart Lock Rooms</p>
              <p className="text-xl font-bold text-gray-800">
                GH₵ {totalSmart.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-md flex-1">
              <p className="text-xs text-gray-500">Manual Lock Rooms</p>
              <p className="text-xl font-bold text-gray-800">
                GH₵ {totalManual.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-44 mt-6">
            {chartData && <Bar data={chartData} options={options} />}
          </div>
        </>
      )}
    </div>
  );
}
