"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cog, Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  { name: "Overview", icon: Cog, link: "/dashboard/finance/overview" },
  { name: "Analytics", icon: Eye, link: "/dashboard/finance/analytics" },
  { name: "Properties", icon: FileText, link: "/dashboard/finance/properties" },
];

export default function DashboardNav() {
  const [active, setActive] = useState("Overview");
  const router = useRouter();

  return (
    <div className="w-full flex justify-center sm:justify-start pt-6">
      <div
        className="
          flex flex-wrap sm:flex-nowrap
          items-center justify-center sm:justify-start
          bg-muted/40 border rounded-lg px-2 py-2 sm:px-4 gap-2
          w-full sm:w-auto max-w-full
        "
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.name;

          return (
            <Button
              key={tab.name}
              variant="ghost"
              onClick={() => {
                setActive(tab.name);
                router.push(tab.link);
              }}
              className={cn(
                "relative flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2",
                "px-3 sm:px-4 py-2 sm:py-1 text-xs sm:text-sm font-medium rounded-md transition-all",
                "hover:bg-muted flex-1 sm:flex-none",
                isActive && "text-black font-semibold"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-background shadow-sm border rounded-md"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Icon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                {/* Hide text label on extra-small screens */}
                <span className="hidden xs:inline-block sm:inline">{tab.name}</span>
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
