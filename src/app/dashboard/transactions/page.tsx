import PaymentHistory from "./PaymentHistory";
import TenantCard from "./Tenant";

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TenantCard />
    <div className="hidden md:block p-6  col-span-2 sm:col-span-1  transition-all ">

    </div>
          <PaymentHistory />
        </div>
      </main>
    </div>
  );
}
