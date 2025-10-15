// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
'use client'
import ReturningRateCard from "@/app/_components/ReturningRateCard";
import SubscriptionCard from "@/app/_components/SubscriptionCard";
import TotalRevenueCard from "@/app/_components/TotalRevenueCard";
import { GiBed, GiSpookyHouse } from "react-icons/gi";
import { HomeStatsCard } from "../../_components/HomeStatsCard";
import StatCard from "../../_components/StatCard";
import TeamMembersCard from "../../_components/TeamMembersCard";
import TransactionHistory from "../../_components/TransactionTable";
import { VisitorsChart } from "../../_components/VisitorsChart";
import CustomersPage from "../../tenants/page";
import RecentActivity from "../overview/RecentActivity";
import FinancialStats from "../../_components/FinancialStats";
import ActivityAnalytics from "../../_components/ActivityAnalytics";
import HousesAddedTable from "../../_components/HouseAddedTable";

export default function Finance() {
  return (
    <div className="">
     
      
      <div className="grid grid-cols-3 gap-4 w-full mb-5">

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
      
      <div className="grid grid-cols-[2fr_1fr]  mb-6 gap-4">

      <RecentActivity/>
      <TeamMembersCard/>
      </div>

<ActivityAnalytics/>
<HousesAddedTable loading={false}/>
     
      <TransactionHistory/>
      
      
    </div>
  );
}
