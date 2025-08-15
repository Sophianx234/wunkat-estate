import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Home, DollarSign, Users } from "lucide-react"

const stats = [
  {
    title: "Total Properties",
    value: "1,247",
    change: "+12%",
    icon: Home,
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: "+8%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Clients",
    value: "342",
    change: "+23%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Market Growth",
    value: "15.3%",
    change: "+2.1%",
    icon: TrendingUp,
    trend: "up",
  },
]

export function DashboardStats() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground">Your Real Estate Insights at a Glance</h2>
        <p className="text-muted-foreground mt-2">
          Manage properties, analyze market trends, and engage clients effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-chart-2 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
