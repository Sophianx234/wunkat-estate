// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import SubscriptionCard from "@/app/_components/SubscriptionCard";
import { DashboardAnalytics } from "../../_components/Analytics";
import TransactionHistory from "../../_components/TransactionTable";
import ReturningRateCard from "@/app/_components/ReturningRateCard";
import TotalRevenueCard from "@/app/_components/TotalRevenueCard";

export default function Finance() {
  return (
    <div className="ml-4">
      {/* Total Income & Revenue */}
    <h1 className="text-xl font-inter pt-4 pl-2 font-bold mb-3">WunkatHomes Dashboard</h1>
      {/* <IncomeCard /> */}

      {/* Sales Analytics */}
      {/* <SalesAnalytics /> */}

      {/* Sold Properties */}
      {/* <SoldAnalytics /> */}

      {/* New Clients */}
      {/* <ClientCard /> */}

      <DashboardAnalytics/>
      <div className="grid grid-cols-[1fr_1fr] items-center mb-6 gap-2">

      <TransactionHistory/>
      <SubscriptionCard/>
      </div>
      <div className="grid grid-cols-2 items-center">

      <ReturningRateCard/>
      <TotalRevenueCard/>
      </div>
      
      
    </div>
  );
}
