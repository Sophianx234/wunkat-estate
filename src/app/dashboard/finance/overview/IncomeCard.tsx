'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
]
function IncomeCard() {
  return (
    <Card className="lg:col-span-14">
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-2xl font-bold">$581M</div>
          <div className="text-sm text-muted-foreground mb-6">Total Revenue: <span className="text-green-500">$478M +2%</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incomeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  )
}

export default IncomeCard
