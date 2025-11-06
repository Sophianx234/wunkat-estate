"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TenantCard from "../../transactions/Tenant";
import PaymentHistory from "../../transactions/PaymentHistory";
import { ScaleLoader } from "react-spinners";

export default function TenantPage() {
  const { id } = useParams(); // Get the dynamic [id] from the URL
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPayment = async () => {
      try {
        const res = await fetch(`/api/payment/${id}`);
        if (!res.ok) throw new Error("Failed to fetch payment data");

        const data = await res.json();
        setPaymentData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-[50vh]">
          <ScaleLoader color="#868e96" />
        </div>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-1 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <TenantCard currTransaction={paymentData?.[0]} />
          <div className="hidden md:block p-6  col-span-1 sm:col-span-1 transition-all"></div>
          <PaymentHistory transactions={paymentData} />
        </div>
      </main>
    </div>
  );
}
