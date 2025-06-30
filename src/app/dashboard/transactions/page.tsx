import PaymentHistory from "./PaymentHistory";
import TenantCard from "./Tenant";

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tenants</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TenantCard />
          <PaymentHistory />
        </div>
      </main>
    </div>
  );
}
