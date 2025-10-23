"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, KeyRound, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Room = {
  id: string;
  name: string;
  smartLock: boolean;
  status: "Locked" | "Unlocked" | "Manually Locked";
};

export default function RoomLockStatusTable() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch room data from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/dashboard/lock-status");
        const data = await res.json();

        if (data.success) {
          setRooms(data.rooms);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ? true : room.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Room Lock Status
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by room ID or name..."
              className="pl-8 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Locked">Locked</SelectItem>
              <SelectItem value="Unlocked">Unlocked</SelectItem>
              <SelectItem value="Manually Locked">Manually Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
          Loading rooms...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-neutral-700">
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400">
                  Room ID
                </th>
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400">
                  Name
                </th>
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400">
                  Smart Lock
                </th>
                <th className="py-2 px-3 text-gray-600 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b last:border-none border-gray-100 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800 dark:text-gray-200">
                      {room.id}
                    </td>
                    <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                      {room.name}
                    </td>
                    <td className="py-2 px-3">
                      {room.smartLock ? (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          Yes
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-400">
                          No
                        </Badge>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {room.status === "Locked" && (
                        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
                          <Lock className="w-4 h-4" /> Locked
                        </span>
                      )}
                      {room.status === "Unlocked" && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                          <Unlock className="w-4 h-4" /> Unlocked
                        </span>
                      )}
                      {room.status === "Manually Locked" && (
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                          <KeyRound className="w-4 h-4" /> Manually Locked
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No rooms match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
