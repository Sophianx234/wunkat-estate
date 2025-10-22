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
import { Skeleton } from "@/components/ui/skeleton";
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
          console.log(data);
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
    <div className="">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 w-full mb-5">
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

      <RecentActivity />
      <TenantSummary />
      <SmartLockOverview />

      <div className="grid grid-cols-[1.5fr_1.5fr_1fr] mb-6 gap-2">
        <PropertyInsightCard />
        <DevicesOverviewCard />
        <TeamMembersCard />
      </div>

      <HousesAddedTable />
      <TransactionHistory />
    </div>
  );
}
