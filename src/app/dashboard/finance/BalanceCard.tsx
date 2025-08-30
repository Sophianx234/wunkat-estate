"use client";

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaHome, FaUsers, FaDollarSign } from "react-icons/fa";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

type ProgressItem = {
  title: string;
  value: string | number;
  target: string;
  progress: number; // % (0-100)
  icon: React.ReactNode;
};

const progressData: ProgressItem[] = [
  {
    title: "Property",
    value: "15,780",
    target: "60% Of Target",
    progress: 60,
    icon: <FaHome className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Revenue",
    value: "$78.3M",
    target: "80% Of Target",
    progress: 80,
    icon: <FaDollarSign className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Customer",
    value: "9,154",
    target: "40% Of Target",
    progress: 40,
    icon: <FaUsers className="w-5 h-5 text-gray-500" />,
  },
];

const BalanceCard: FC = () => {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md border p-4">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-gray-500 font-medium">My Balance</h3>
          <button className="text-gray-400 hover:text-gray-600">⋮</button>
        </div>

        {/* Balance */}
        <p className="text-2xl font-bold mb-4">$117,000.43</p>

        {/* Income & Expense */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MdTrendingUp className="text-green-500 w-5 h-5" />
            <div>
              <p className="text-sm font-semibold">$13,321.12</p>
              <p className="text-xs text-gray-500">Income</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MdTrendingDown className="text-red-500 w-5 h-5" />
            <div>
              <p className="text-sm font-semibold">$13,321.12</p>
              <p className="text-xs text-gray-500">Expanse</p>
            </div>
          </div>
        </div>

        {/* Progress Items */}
        <div className="space-y-4">
          {progressData.map((item) => (
            <div key={item.title} className="flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">{item.icon}</div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.target}</p>
                  {/* Progress Bar */}
                  <div className="w-40 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-orange-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right side */}
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
