"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Wallet,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function FinancialStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    expiredSubscriptions: 0,
    autoLockedRooms: 0,
    monthlyGrowth: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/financial-stats");
        const json = await res.json();

        if (res.ok) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Error fetching financial stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    positive = true,
    badge,
  }: {
    title: string;
    value: string | number;
    icon: any;
    trend?: number;
    positive?: boolean;
    badge?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-md transition-all duration-200">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </CardTitle>
          <Icon className="w-5 h-5 text-primary" />
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            {trend !== undefined && !loading && (
              <div
                className={`flex items-center text-sm ${
                  positive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {positive ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {trend}%
              </div>
            )}
            {badge && (
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-6">
      <StatCard
        title="Total Revenue"
        value={`₵${stats.totalRevenue.toLocaleString()}`}
        icon={Wallet}
        badge="All-Time"
      />
        <StatCard
          title="Expired Subscriptions"
          value={stats.expiredSubscriptions}
          icon={Clock}
          badge="Expired"
          />
      
      <StatCard
        title="Active Subscriptions"
        value={stats.activeSubscriptions}
        icon={Clock}
        badge="Active"
      />
      
    </div>
  );
}
