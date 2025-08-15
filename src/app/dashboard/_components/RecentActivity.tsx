import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Eye, MessageSquare, Phone } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "viewing",
    client: "Sarah Johnson",
    property: "Modern Downtown Condo",
    time: "2 hours ago",
    icon: Eye,
  },
  {
    id: 2,
    type: "inquiry",
    client: "Mike Chen",
    property: "Luxury Family Home",
    time: "4 hours ago",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "call",
    client: "Emma Davis",
    property: "Cozy Starter Home",
    time: "1 day ago",
    icon: Phone,
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.client
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity.client}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.property}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <activity.icon className="h-3 w-3" />
                <Clock className="h-3 w-3" />
                {activity.time}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Explore Listings
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Clients
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Schedule Viewing
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
