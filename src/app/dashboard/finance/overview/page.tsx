// Update the import path below if your Avatar component is located elsewhere
// Update the import path below if your Avatar component is located elsewhere
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
'use client'
import ReturningRateCard from "@/app/_components/ReturningRateCard";
import TotalRevenueCard from "@/app/_components/TotalRevenueCard";
import { VisitorsChart } from "../../_components/VisitorsChart";
import CustomersPage from "../../tenants/page";

export default function Page() {
  return (
    <div className="">
    
      
      
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-6 ">

      <ReturningRateCard/>
      <TotalRevenueCard/>
      </div>
    


      <VisitorsChart/>
      <div className="mt-4">

      <CustomersPage type="admin"/>
      </div>
      
      
      
    </div>
  );
}
