// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import ClientCard from "../ClientCard";
import IncomeCard from "../IncomeCard";
import SalesAnalytics from "../SalesAnalytics";
import SoldAnalytics from "../SoldAnalytics";

export default function Finance() {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-12 sm:mt-10 mt-24">
      {/* Total Income & Revenue */}
    <h1 className="text-xl font-inter font-bold">Business Statistics</h1>
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
