// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
'use client'
import DevicesOverviewCard from "../../_components/DevicesOverviewCard";
import HousesAddedTable from "../../_components/HouseAddedTable";
import PropertyInsightCard from "../../_components/PropertyInsightCard";
import SmartLockOverview from "../../_components/SmartLockOverview";
import StatCard from "../../_components/StatCard";
import TeamMembersCard from "../../_components/TeamMembersCard";
import TenantSummary from "../../_components/TenantSummary";
import TransactionHistory from "../../_components/TransactionTable";
import RecentActivity from "../overview/RecentActivity";

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
        title="Total Revenue"
        value={1226}
        trendData={[8, 10, 7, 6, 8, 7, 9]}
        changePercent={-40.2}
      />
      <StatCard
        title="Avg Rent per Room"
        value={1080}
        trendData={[9, 11, 10, 12, 13, 14, 15]}
        changePercent={10.8}
        />
        </div>
      
      <RecentActivity/>
      <TenantSummary/>
      <SmartLockOverview/>
      <div className="grid grid-cols-[1.5fr_1.5fr_1fr]  mb-6 gap-2">
      <PropertyInsightCard/>
      <DevicesOverviewCard/>

      <TeamMembersCard/>
      </div>

<HousesAddedTable loading={false}/>
     
      <TransactionHistory/>
      
      
    </div>
  );
}
