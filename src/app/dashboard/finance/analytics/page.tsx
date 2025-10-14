// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
'use client'
import ReturningRateCard from "@/app/_components/ReturningRateCard";
import SubscriptionCard from "@/app/_components/SubscriptionCard";
import TotalRevenueCard from "@/app/_components/TotalRevenueCard";
import { GiBed, GiSpookyHouse } from "react-icons/gi";
import { DashboardAnalytics } from "../../_components/Analytics";
import { HomeStatsCard } from "../../_components/HomeStatsCard";
import TransactionHistory from "../../_components/TransactionTable";
import { VisitorsChart } from "../../_components/VisitorsChart";
import CustomersPage from "../../tenants/page";
import RecentActivity from "./RecentActivity";
import TeamMembersCard from "../../_components/TeamMembersCard";
import StatCard from "../../_components/StatCard";
import DashboardNav from "../../_components/DashNav";

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

      {/* <DashboardAnalytics/> */}
      <div className="grid grid-cols-[1fr_2fr] mb-3">

      <DashboardNav/>
      <div></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-5">

        <StatCard
        title="New Subscriptions"
        value={4682}
        trendData={[10, 8, 12, 9, 11, 10, 13]}
        changePercent={15.54}
      />
      <StatCard
        title="New Orders"
        value={1226}
        trendData={[8, 10, 7, 6, 8, 7, 9]}
        changePercent={-40.2}
      />
      <StatCard
        title="Avg Order Revenue"
        value={1080}
        trendData={[9, 11, 10, 12, 13, 14, 15]}
        changePercent={10.8}
        />
        </div>
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
