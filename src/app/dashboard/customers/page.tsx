'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import CustomerRow from "../_components/CustomerRow"

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  apartment: string;
  roomNumber: string;
  rentExpiry: string; // ISO date string
  rentStatus: "active" | "due_soon" | "expired";
  smartLockStatus: "locked" | "unlocked";
  image:string
};


/* const initialCustomers = [
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
] */

const customerx: Customer[] = [
  {
    id: 1,
    name: "James Carter",
    email: "jamescarter@gmail.com",
    phone: "+233 244 123 456",
    location: "Brooklyn, NY",
    apartment: "Willow Apartments",
    roomNumber: "202",
    rentExpiry: "2025-08-10",
    rentStatus: "active",
    smartLockStatus: "locked",
    image: "/images/prof-1.jpg"
  },
  {
    id: 2,
    name: "Sophia West",
    email: "sophia.west@example.com",
    phone: "+233 245 876 321",
    location: "Queens, NY",
    apartment: "Maple Heights",
    roomNumber: "305",
    rentExpiry: "2025-07-20",
    rentStatus: "due_soon",
    smartLockStatus: "unlocked",
    image: "/images/prof-2.jpg"
  },
  {
    id: 3,
    name: "Daniel Kim",
    email: "daniel.kim@gmail.com",
    phone: "+233 240 777 000",
    location: "Manhattan, NY",
    apartment: "Cedar Villas",
    roomNumber: "101",
    rentExpiry: "2025-06-30",
    rentStatus: "expired",
    smartLockStatus: "locked",
    image: "/images/prof-3.jpg"
  },
  {
    id: 4,
    name: "Amina Abubakar",
    email: "amina.a@gmail.com",
    phone: "+233 550 123 999",
    location: "Kumasi, Ghana",
    apartment: "Zongo Estates",
    roomNumber: "14B",
    rentExpiry: "2025-09-01",
    rentStatus: "active",
    smartLockStatus: "unlocked",
    image: "/images/prof-1.jpg"
  },
  {
    id: 5,
    name: "Kwame Owusu",
    email: "kwameowusu@example.com",
    phone: "+233 208 333 111",
    location: "Accra, Ghana",
    apartment: "East Legon Hills",
    roomNumber: "4C",
    rentExpiry: "2025-07-18",
    rentStatus: "due_soon",
    smartLockStatus: "locked",
    image: "/images/prof-2.jpg"
  }
];


export default function CustomersPage() {
  const [customers] = useState<Customer[]>(customerx)
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", location: "", apartment: "" })

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return
    /* setCustomers([
      ...customers,
      {
        ...newCustomer,
        image: "/avatars/default.jpg",
        status: "Pending",
      },
    ]) */
    setNewCustomer({ name: "", email: "", phone: "", location: "", apartment: "" })
  }

  return (
    <div className="p-6  space-y-6 mt-24 sm:mt-0">
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

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        {(customers).map((customer) => (
          <CustomerRow key={customer.id} customer={customer}/>
        ))}
      {/* </div> */}
    </div>
  )
}
