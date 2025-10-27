"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentHistory from "../PaymentHistory";
import TenantCard from "../Tenant";
import { ScaleLoader } from "react-spinners";

export default function TransactionsPage() {
  const { id } = useParams<{ id: string }>();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/payment/${id}`);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ScaleLoader color="#000" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10 p-6">
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenant Info */}
        <div className="lg:col-span-1">
          <TenantCard currTransaction={transactions[0]} />
        </div>

        {/* Payment History */}
        <div className="lg:col-span-2">
          <PaymentHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
