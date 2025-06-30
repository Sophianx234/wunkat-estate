'use client'
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useState } from "react"

function AgentForm() {
  
  const [newAgent, setNewAgent] = useState({ name: "", role: "", email: "", phone: "" })

  const handleAddAgent = () => {
    if (!newAgent.name || !newAgent.email) return
    // setAgents([
    //   ...agents,
    //   {
    //     ...newAgent,
    //     image: "/avatars/default.jpg",
    //     status: "Active",
    //     properties: 0,
    //   },
    // ])
    setNewAgent({ name: "", role: "", email: "", phone: "" })
  }
  return (
    <Card className="p-4">
        <CardTitle className="text-lg mb-4">Add New Agent</CardTitle>
        <div className="grid sm:grid-cols-4 gap-4">
          <Input
            placeholder="Full Name"
            value={newAgent.name}
            onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
          />
          <Input
            placeholder="Role"
            value={newAgent.role}
            onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newAgent.email}
            onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={newAgent.phone}
            onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
          />
        </div>
        <Button className="mt-4" onClick={handleAddAgent}>
          <Plus className="w-4 h-4 mr-2" /> Add Agent
        </Button>
      </Card>
  )
}

export default AgentForm
