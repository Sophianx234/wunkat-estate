import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const activities = [
  {
    name: "Idella",
    email: "idella_koch50@gmail.com",
    status: "Delete",
    id: "#329341",
    date: "28 min ago",
    amount: "$319.84",
  },
  {
    name: "Eino",
    email: "eino_oberbrunner87@hotmail.com",
    status: "Invited",
    id: "#329341",
    date: "39 min ago",
    amount: "$793.24",
  },
  {
    name: "Tod",
    email: "tod73@hotmail.com",
    status: "Delete",
    id: "#329341",
    date: "59 min ago",
    amount: "$115.59",
  },
  {
    name: "Kraig",
    email: "kraig91@hotmail.com",
    status: "Suspended",
    id: "#329341",
    date: "37 min ago",
    amount: "$558.77",
  },
  {
    name: "Trudie",
    email: "trudie84@yahoo.com",
    status: "New",
    id: "#329341",
    date: "38 min ago",
    amount: "$687.72",
  },
];

export default function RecentActivity() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm">Period</Button>
        </div>
        <div className="grid grid-cols-5 text-sm font-medium text-gray-500 mb-2">
          <span>User</span>
          <span>Status</span>
          <span>ID</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="space-y-3">
          {activities.map((a, idx) => (
            <div
              key={idx}
              className="grid grid-cols-5 items-center text-sm border-b pb-2 last:border-0 last:pb-0"
            >
              {/* User */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {a.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-gray-500">{a.email}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                {a.status === "Delete" && (
                  <Button variant="destructive" size="sm">Delete</Button>
                )}
                {a.status === "Invited" && (
                  <Badge variant="secondary">Invited</Badge>
                )}
                {a.status === "Suspended" && (
                  <Badge className="bg-orange-100 text-orange-700">Suspended</Badge>
                )}
                {a.status === "New" && (
                  <Badge className="bg-blue-100 text-blue-700">New</Badge>
                )}
              </div>

              {/* ID */}
              <span>{a.id}</span>

              {/* Date */}
              <span>{a.date}</span>

              {/* Amount */}
              <span className="text-right font-medium">{a.amount}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">A list of your recent activity.</p>
      </CardContent>
    </Card>
  );
}
