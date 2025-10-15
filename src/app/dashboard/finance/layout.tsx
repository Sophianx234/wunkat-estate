'use client'

import DashboardNav from "../_components/DashNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4">
      {/* Dashboard Header */}
      <h1 className="text-xl font-inter font-bold mb-4">
        WunkatHomes Dashboard
      </h1>

      {/* Dashboard Navigation */}
      <div className="flex items-center mb-6">
        <DashboardNav />
      </div>

      {/* Page Content */}
      <div className="">
        {children}
      </div>
    </div>
  );
}
