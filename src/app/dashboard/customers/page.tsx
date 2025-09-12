"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import CustomersTable from "../_components/CustomerTable";

const customerx = [
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
    image: "/images/prof-1.jpg",
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
    image: "/images/prof-2.jpg",
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
    image: "/images/prof-3.jpg",
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
    image: "/images/prof-1.jpg",
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
    image: "/images/prof-2.jpg",
  },
];

export default function CustomersPage() {
  const [customers] = useState(customerx);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    apartment: "",
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) return;
    // You can push to state or backend here
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      location: "",
      apartment: "",
    });
  };

  return (
    <div className="p-6 space-y-6 mt-24 sm:mt-0">
      {/* Add new customer card */}
      <Card className="p-4">
        <CardTitle className="text-lg mb-4">Add New Customer</CardTitle>
        <div className="grid sm:grid-cols-5 gap-4">
          <Input
            placeholder="Full Name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
          />
          <Input
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, phone: e.target.value })
            }
          />
          <Input
            placeholder="Location"
            value={newCustomer.location}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, location: e.target.value })
            }
          />
          <Input
            placeholder="Apartment"
            value={newCustomer.apartment}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, apartment: e.target.value })
            }
          />
        </div>
        <Button className="mt-4" onClick={handleAddCustomer}>
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </Card>

      {/* Customers Table (TanStack + CustomerRow) */}
      <CustomersTable data={customers} />
    </div>
  );
}
