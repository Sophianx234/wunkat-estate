"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaymentHistory from "../PaymentHistory";
import TenantCard from "../Tenant";
import { IPayment } from "@/models/Payment";
import { ScaleLoader } from "react-spinners";

export default function TransactionsPage() {
  const { id } = useParams<{ id: string }>();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // wait until we have an id

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/payment/${id}`);
        const data = await res.json();
        console.log("transactions data", data);
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]); // re-run if id changes

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ScaleLoader color="#000" />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TenantCard currTransaction={transactions[0]} />
          <div className="hidden md:block p-6 col-span-2 sm:col-span-1 transition-all" />
          <PaymentHistory transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
