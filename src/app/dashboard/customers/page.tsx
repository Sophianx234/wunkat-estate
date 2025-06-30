'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { useState } from "react"

const initialCustomers = [
  {
    name: "James Carter",
    email: "james@estatevista.com",
    phone: "+1 234 567 8901",
    image: "/avatars/1.jpg",
    status: "Verified",
    location: "Brooklyn, NY",
    apartment: "Apt 101 - Sunrise Towers",
  },
  {
    name: "Sophia West",
    email: "sophia@estatevista.com",
    phone: "+1 987 654 3210",
    image: "/avatars/2.jpg",
    status: "Pending",
    location: "Queens, NY",
    apartment: "Apt 203 - Maple Heights",
  },
  {
    name: "Daniel Kim",
    email: "daniel@estatevista.com",
    phone: "+1 555 666 7777",
    image: "/avatars/3.jpg",
    status: "Verified",
    location: "Manhattan, NY",
    apartment: "Apt 305 - Riverfront Residences",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", location: "", apartment: "" })

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return
    setCustomers([
      ...customers,
      {
        ...newCustomer,
        image: "/avatars/default.jpg",
        status: "Pending",
      },
    ])
    setNewCustomer({ name: "", email: "", phone: "", location: "", apartment: "" })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-muted-foreground text-sm">Manage all registered customers</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search customers..." className="w-64" />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <CardTitle className="text-lg mb-4">Add New Customer</CardTitle>
        <div className="grid sm:grid-cols-5 gap-4">
          <Input
            placeholder="Full Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={newCustomer.location}
            onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
          />
          <Input
            placeholder="Apartment"
            value={newCustomer.apartment}
            onChange={(e) => setNewCustomer({ ...newCustomer, apartment: e.target.value })}
          />
        </div>
        <Button className="mt-4" onClick={handleAddCustomer}>
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer, i) => (
          <Card key={i} className="hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={customer.image} />
                <AvatarFallback>{customer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-semibold">{customer.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{customer.location}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <p>Email: <span className="text-muted-foreground">{customer.email}</span></p>
                <p>Phone: <span className="text-muted-foreground">{customer.phone}</span></p>
                <p>Apartment: <span className="text-muted-foreground">{customer.apartment}</span></p>
              </div>
              <Badge variant={customer.status === "Verified" ? "default" : "secondary"}>
                {customer.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
