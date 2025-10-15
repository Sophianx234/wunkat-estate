"use client";

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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TopProductsChart() {
  const data = {
    labels: ["Boots4", "Reign Pro", "Slick", "Falcon", "Sparrow", "Hideaway", "Freya"],
    datasets: [
      {
        label: "2019",
        data: [42, 81, 85, 70, 78, 49, 79],
        backgroundColor: "rgba(37, 99, 235, 0.9)", // blue-600
        borderRadius: 6,
      },
      {
        label: "2018",
        data: [84, 72, 61, 52, 49, 68, 89],
        backgroundColor: "rgba(191, 219, 254, 0.9)", // blue-200
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.6)", // light gray grid
          borderDash: [4, 4],
        },
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold">Top Products</CardTitle>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View Details
        </a>
      </CardHeader>
      <CardContent>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
