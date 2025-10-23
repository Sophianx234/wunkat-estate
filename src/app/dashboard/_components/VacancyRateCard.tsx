"use client";

import { motion } from "framer-motion";
import { IoIosBed } from "react-icons/io";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type VacancyRateCardProps = {
  totalRooms: number;
  availableRooms: number;
  bookedRooms?: number;
};

export default function VacancyRateCard({
  totalRooms,
  availableRooms
}: VacancyRateCardProps) {
  const vacancyRate =
    totalRooms > 0 ? ((availableRooms / totalRooms) * 100).toFixed(1) : "0";

  // Dynamic color: green (healthy) → yellow (moderate) → red (low)
  const rate = parseFloat(vacancyRate);
  const ringColor =
    rate >= 70 ? "#10b981" : rate >= 40 ? "#facc15" : "#ef4444";

  const data = [
    { name: "Available", value: availableRooms },
    { name: "Occupied", value: totalRooms - availableRooms },
  ];

  const COLORS = [ringColor, "#e5e7eb"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-xl bg-primary/10 text-primary">
            <IoIosBed className="w-7 h-7" />
          </span>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Vacancy Rate
          </h3>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4 leading-snug">
        Indicates the percentage of rooms currently available out of total rooms.
        A higher rate means more available spaces.
      </p>

      {/* Chart + Value */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-3xl font-bold ${
                rate >= 70
                  ? "text-emerald-500"
                  : rate >= 40
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {vacancyRate}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Available
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {availableRooms}
            </span>
            <br />
            Available Rooms
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {totalRooms}
            </span>
            <br />
            Total Rooms
          </p>
        </div>

        <p className="text-xs text-gray-400 italic mt-3">
          {(totalRooms - availableRooms).toLocaleString()} currently booked
        </p>
      </div>
    </motion.div>
  );
}
