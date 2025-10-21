"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

type House = {
  id: string;
  name: string;
  location: string;
  smartlock: boolean;
  createdAt: string;
};

export default function RecentlyAddedHousesTable() {
  const [recentHouses, setRecentHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent houses from backend
  useEffect(() => {
    const fetchRecentHouses = async () => {
      try {
        const res = await fetch("/api/dashboard/recent-houses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRecentHouses(data);
      } catch (error) {
        console.error("Error loading recent houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentHouses();
  }, []);

  return (
    <Card className="p-3 rounded-xl border mb-3 border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pt-2">
        <h2 className="text-lg font-semibold">Recently Added Houses</h2>
      </CardHeader>

      <CardContent>
        {loading ? (
          // 🧱 Skeleton Loading State
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[40px] w-full" />
            ))}
          </div>
        ) : recentHouses.length === 0 ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
            No houses added yet.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    House Name
                  </TableHead>
                  <TableHead className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Location
                  </TableHead>
                  <TableHead className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    Smartlock
                  </TableHead>
                  <TableHead className="text-xs uppercase text-gray-500 dark:text-gray-400 text-right">
                    Date Added
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentHouses.map((house) => (
                  <TableRow
                    key={house.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-800/40 transition"
                  >
                    <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                      {house.name}
                    </TableCell>

                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {house.location}
                    </TableCell>

                    <TableCell className="text-center">
                      {house.smartlock ? (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-500/40 bg-green-50 dark:bg-green-900/20 flex items-center gap-1 justify-center"
                        >
                          <Unlock className="w-3 h-3" /> Enabled
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-gray-500 border-gray-400/40 bg-gray-50 dark:bg-gray-800/30 flex items-center gap-1 justify-center"
                        >
                          <Lock className="w-3 h-3" /> Manual
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right text-sm text-gray-500 dark:text-gray-400">
                      {new Date(house.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
