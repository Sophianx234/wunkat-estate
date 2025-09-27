"use client";
import { useState } from "react";
import CustomerRow from "../_components/CustomerRow";
import FilterBar from "../_components/FilterBar";
import CustomerTable from "../_components/CustomerTable";

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
    rentStatus: "pending",
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

export type Customer = {
  id: number
  name: string
  email: string
  phone: string
  location: string
  apartment: string
  roomNumber: string
  rentExpiry: string // ISO date string e.g. "2025-08-10"
  rentStatus: string // extend as needed
  smartLockStatus: string
  image: string
}
export default function CustomersPage() {
  const [customers] = useState(customerx);
  const [filtered, setFiltered] = useState(customerx);

  const handleFilter = (filters: {
    search: string;
    rentStatus: string;
    lockStatus: string;
  }) => {
    let result = [...customers];

    if (filters.search) {
      result = result.filter((c) =>
        [c.name, c.email, c.roomNumber].some((field) =>
          field.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    if (filters.rentStatus) {
      result = result.filter((c) => c.rentStatus === filters.rentStatus);
    }

    if (filters.lockStatus) {
      result = result.filter((c) => c.smartLockStatus === filters.lockStatus);
    }

    setFiltered(result);
  };

  return (
    <div className="p-6 space-y-6 mt-24 sm:mt-0">
      <FilterBar onFilter={handleFilter} />

      <div className="space-y-4">
        <CustomerTable />
         {filtered.map((customer) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No customers found.</p>
        )}
      </div>
    </div>
  );
}
