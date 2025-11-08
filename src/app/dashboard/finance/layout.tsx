'use client'

import DashboardNav from "../_components/DashNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4">
      {/* Dashboard Header */}
     

      {/* Dashboard Navigation */}
      <div className="flex items-center mb-2">
        <DashboardNav />
      </div>

      {/* Page Content */}
      <div className="">
        {children}
      </div>
    </div>
  );
}
