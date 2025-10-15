"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cog, Eye, FileText, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  { name: "Overview", icon: Cog ,link: "/dashboard/finance/overview"},
  { name: "Analytics", icon: Eye ,link: "/dashboard/finance/analytics"},
  { name: "Properties", icon: FileText, link: "/dashboard/finance/properties" },
  { name: "Notifications", icon: Bell, link: "/dashboard/finance/notifications" },
];

export default function DashboardNav() {
  const [active, setActive] = useState("Analytics");
  const router = useRouter();

  return (
    <div className="flex items-center justify-center py-1 px-2 bg-muted/40 rounded-lg border">
      <div className="flex gap-1 relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.name;
          return (
            <Button
              key={tab.name}
              variant="ghost"
              onClick={() => {
                setActive(tab.name)
                router.push(tab.link)
              }}
              className={cn(
                "relative flex items-center  px-3 py-1 text-xs font-medium rounded-md transition-all",
                "hover:bg-muted",
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
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {tab.name}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
