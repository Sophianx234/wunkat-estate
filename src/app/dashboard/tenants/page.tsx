"use client";
import { useState } from "react";
import CustomerTable from "../_components/CustomerTable";
import FilterBar from "../_components/FilterBar";
import { Loader2 } from "lucide-react"; // spinner icon
import { transactionType } from "../transactions/PaymentHistory";

const customerx:[] = [
  // ... your mock data
];

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  apartment: string;
  roomNumber: string;
  rentExpiry: string; // ISO date string
  rentStatus: string; // extend as needed
  smartLockStatus: string;
  image: string;
};

export default function CustomersPage() {
  const [customers] = useState<transactionType[]|null>(null);
  const [filtered, setFiltered] = useState<transactionType[]|null>(null);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleFilter = async (filters: {
    search: string;
    rentStatus: string;
    lockStatus: string;
  }) => {
    try {
      if (!filters.search && !filters.rentStatus && !filters.lockStatus) {
      return;
    }
      setLoading(true); // start loader
      const res = await fetch("/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      const data = await res.json();
      setFiltered(data);
    } catch (error) {
      console.error("❌ Error fetching filtered data:", error);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
  <div className="p-6 space-y-6 mt-24 sm:mt-0">
    <FilterBar onFilter={handleFilter} />

    <div className="space-y-4 min-h-[200px] flex justify-center items-center">
      {loading ? (
        // ✅ Loading state
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading customers...</span>
        </div>
      ) : filtered && filtered.length === 0 ? (
        // ✅ No results state
        <div className="text-gray-500 text-sm italic">
          No customers match your filter.
        </div>
      ) : (
        // ✅ Show table (fallback to [] if null to avoid errors)
        <CustomerTable customers={filtered ?? []} />
      )}
    </div>
  </div>
);
}