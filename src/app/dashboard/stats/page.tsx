// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ClientCard from "./ClientCard";
import IncomeCard from "./IncomeCard";
import SalesAnalytics from "./SalesAnalytics";
import SoldAnalytics from "./SoldAnalytics";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-12 mt-32">
      {/* Total Income & Revenue */}

      <IncomeCard />

      {/* Sales Analytics */}
      <SalesAnalytics />

      {/* Sold Properties */}
      <SoldAnalytics />

      {/* New Clients */}
      <ClientCard />
    </div>
  );
}
