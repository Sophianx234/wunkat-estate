'use client'

import { useEffect, useState } from "react";
import DevicesOverviewCard from "../../_components/DevicesOverviewCard";
import HousesAddedTable from "../../_components/HouseAddedTable";
import PropertyInsightCard from "../../_components/PropertyInsightCard";
import SmartLockOverview from "../../_components/SmartLockOverview";
import StatCard from "../../_components/StatCard";
import TeamMembersCard from "../../_components/TeamMembersCard";
import TenantSummary from "../../_components/TenantSummary";
import TransactionHistory from "../../_components/TransactionTable";
import RecentActivity from "../overview/RecentActivity";
import StatCardSkeleton from "@/components/skeletons/StatsCardSkeleton";

export interface StatData {
  title: string;
  value: number;
  trendData: number[];
  changePercent: number;
}

export interface DashboardStats {
  newSubscriptions: StatData;
  totalRevenue: StatData;
  avgRent: StatData;
}

export default function Finance() {
  const [cardStats, setCardStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (res.ok) {
          const data = await res.json();
          setCardStats(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-5">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard {...cardStats!.newSubscriptions} />
            <StatCard {...cardStats!.totalRevenue} curr={true} />
            <StatCard {...cardStats!.avgRent} curr={true} />
          </>
        )}
      </div>

      {/* Activity and Summary */}
      <div className="flex flex-col gap-6">
        <RecentActivity />
        <TenantSummary />
        <SmartLockOverview />
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.5fr_1fr] gap-4 mb-6">
        <PropertyInsightCard />
        <DevicesOverviewCard />
        <TeamMembersCard />
      </div>

      {/* Tables */}
      <div className="flex flex-col gap-6">
        <div className="overflow-x-auto">
          <HousesAddedTable />
        </div>
        <div className="overflow-x-auto">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
