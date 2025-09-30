// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
'use client'
import ReturningRateCard from "@/app/_components/ReturningRateCard";
import SubscriptionCard from "@/app/_components/SubscriptionCard";
import TotalRevenueCard from "@/app/_components/TotalRevenueCard";
import { DashboardAnalytics } from "../../_components/Analytics";
import HouseStats from "../../_components/HouseStats";
import TeamMembersCard from "../../_components/TeamMembersCard";
import TransactionHistory from "../../_components/TransactionTable";
import { VisitorsChart } from "../../_components/VisitorsChart";
import CustomersPage from "../../tenants/page";
import RecentActivity from "./RecentActivity";
import RoomsCard, { HomeStatsCard } from "../../_components/HomeStatsCard";
import { DoorClosed, Home } from "lucide-react";
import { GiBed, GiSpookyHouse } from "react-icons/gi";

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
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-6 ">

      <ReturningRateCard/>
      <TotalRevenueCard/>
      </div>
      <div className="grid grid-cols-[2fr_1fr]  mb-6 gap-4">

      <RecentActivity/>
      <TeamMembersCard/>
      </div>


      <VisitorsChart/>
      <CustomersPage/>
      <div className="grid grid-cols-[3fr_3fr_.5fr] gap-3  my-6 ">
         <HomeStatsCard
        title="Total Houses"
        value={128}
        icon={GiSpookyHouse}
        buttonLabel="View Houses"
        onButtonClick={() => console.log("View Houses clicked")}
      />
      <HomeStatsCard
        title="Total Rooms"
        value={732}
        icon={GiBed}
        buttonLabel="View Rooms"
        onButtonClick={() => console.log("View Rooms clicked")}
      />
      <SubscriptionCard/>
      </div>
      <TransactionHistory/>
      
      
    </div>
  );
}
