'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const pieData = [
  { name: "By Website", value: 34, color: "#6366f1" },
  { name: "By Agent", value: 45, color: "#22c55e" },
  { name: "By Market Team", value: 16, color: "#f59e0b" },
  { name: "By App", value: 21, color: "#ec4899" },
];

function SalesAnalytics() {
  return (
    <Card className="lg:col-span-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Sales Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="text-xl font-bold text-gray-900">Total Sale: $109M</div>

        {/* Make pie chart always fit */}
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                outerRadius={70}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name.split(" ")[1]}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  marginTop: 10,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default SalesAnalytics;
