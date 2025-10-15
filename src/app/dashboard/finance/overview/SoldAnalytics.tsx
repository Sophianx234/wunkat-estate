'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const incomeData = [
  { name: "Jan", income: 10 },
  { name: "Feb", income: 30 },
  { name: "Mar", income: 50 },
  { name: "Apr", income: 60 },
  { name: "May", income: 45 },
  { name: "Jun", income: 95 },
  { name: "Jul", income: 48 },
  { name: "Aug", income: 40 },
  { name: "Sep", income: 45 },
  { name: "Oct", income: 50 },
  { name: "Nov", income: 65 },
  { name: "Dec", income: 25 },
];

function IncomeCard() {
  return (
    <Card className="lg:col-span-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Total Income
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-3xl font-bold text-gray-900">$581M</div>
        <div className="text-sm text-gray-500 mb-6">
          Total Revenue: <span className="text-green-500">$478M +2%</span>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={incomeData} barCategoryGap={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #eee", borderRadius: 8 }}
              labelStyle={{ color: "#888", fontSize: 12 }}
              itemStyle={{ color: "#000" }}
            />
            <Bar
              dataKey="income"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              animationDuration={700}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default IncomeCard;
