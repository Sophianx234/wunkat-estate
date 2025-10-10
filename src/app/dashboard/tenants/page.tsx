"use client";
import { useEffect, useState } from "react";
import CustomerTable from "../_components/CustomerTable";
import FilterBar from "../_components/FilterBar";
import { Loader2 } from "lucide-react";
import { transactionType } from "../transactions/PaymentHistory";

export default function CustomersPage() {
  const [filtered, setFiltered] = useState<transactionType[] | null>(null);
  const [payments, setPayments] = useState<transactionType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async (filters: {
    search: string;
    rentStatus: string;
    lockStatus: string;
  }) => {
    try {
      if (!filters.search && !filters.rentStatus && !filters.lockStatus) {
        setFiltered(null); // reset to show all
        return;
      }
      setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
           const res = await fetch("/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
        const data = await res.json();
        console.log("dataxxxx", data);
        console.log("dataxxxx", data);
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="p-6 space-y-6 mt-24 sm:mt-0">
      <FilterBar onFilter={handleFilter} />

      <div className="space-y-4 min-h-[200px] flex justify-center items-center">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading Tenants...</span>
          </div>
        ) : (
          // ✅ No filter → show all payments
          <CustomerTable customers={payments} />
        ) }
      </div>
    </div>
  );
}
