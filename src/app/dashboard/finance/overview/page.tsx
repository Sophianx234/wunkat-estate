"use client";

import ReturningRateCard from "@/app/_components/ReturningRateCard";
import TotalRevenueCard from "@/app/_components/TotalRevenueCard";
import { VisitorsChart } from "../../_components/VisitorsChart";
import CustomersPage from "../../tenants/page";

export default function Page() {
  return (
    <div className=" py-6">
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-4 mb-6">
        <ReturningRateCard />
        <TotalRevenueCard />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow  sm:p-6 mb-6">
        <VisitorsChart />
      </div>

      {/* Customers Section */}
      <div className="mt-4">
        <CustomersPage type="admin" />
      </div>
    </div>
  );
}
