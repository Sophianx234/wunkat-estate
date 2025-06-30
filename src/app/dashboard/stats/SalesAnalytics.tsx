'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart } from "recharts"

const pieData = [
  { name: "By Website", value: 37, color: "#6366f1" },
  { name: "By Agent", value: 65, color: "#22c55e" },
  { name: "By Market Team", value: 4, color: "#f59e0b" },
  { name: "By App", value: 3, color: "#ec4899" },
]
function SalesAnalytics() {
  return (
    <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold mb-2">Total Sale: $109M</div>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </CardContent>
      </Card>
  )
}

export default SalesAnalytics
