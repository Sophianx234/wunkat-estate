'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import AgentForm from "./AgentForm"

const initialAgents = [
  {
    name: "Emily Watson",
    role: "Senior Agent",
    email: "emily@estatevista.com",
    phone: "+1 456 789 0123",
    image: "/avatars/4.jpg",
    status: "Active",
    properties: 24,
  },
  {
    name: "Marcus Reed",
    role: "Junior Agent",
    email: "marcus@estatevista.com",
    phone: "+1 321 654 0987",
    image: "/avatars/5.jpg",
    status: "On Leave",
    properties: 12,
  },
  {
    name: "Hannah Lee",
    role: "Agent",
    email: "hannah@estatevista.com",
    phone: "+1 789 456 1230",
    image: "/avatars/6.jpg",
    status: "Active",
    properties: 18,
  },
]

export default function AgentsPage() {
  const [agents] = useState(initialAgents)

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Agents</h2>
          <p className="text-muted-foreground text-sm">Manage all real estate agents</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search agents..." className="w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, i) => (
          <Card key={i} className="hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={agent.image} />
                <AvatarFallback>{agent.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-semibold">{agent.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{agent.role}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <p>Email: <span className="text-muted-foreground">{agent.email}</span></p>
                <p>Phone: <span className="text-muted-foreground">{agent.phone}</span></p>
                <p>Properties Managed: <strong>{agent.properties}</strong></p>
              </div>
              <Badge variant={agent.status === "Active" ? "default" : "secondary"}>
                {agent.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <AgentForm/>
    </div>
  )
}
