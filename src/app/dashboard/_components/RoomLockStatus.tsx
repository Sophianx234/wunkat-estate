"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, KeyRound, Search, MapPin } from "lucide-react";
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
  location: {
    address: string;
    city: string;
    region: string;
  };
};

export default function RoomLockStatusTable() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

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
    const locationText = `${room.location.address} ${room.location.city} ${room.location.region}`.toLowerCase();
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      locationText.includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ? true : room.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=" rounded-2xl  "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 shadow-sm gap-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
          Room Lock Overview
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search rooms or locations..."
              className="pl-9 text-sm border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/50 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white/70 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-800 focus:ring-0">
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
        <p className="text-center text-neutral-500 dark:text-neutral-400 py-6">
          Loading rooms...
        </p>
      ) : (
        <div className="overflow-x-auto bg-neutral-50 dark:bg-neutral-900 border shadow-sm border-neutral-200 dark:border-neutral-800 p-6">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">
                <th className="py-2 px-4 text-left">Room Name</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Smart Lock</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <motion.tr
                    key={room.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-neutral-800/60 rounded-xl  duration-200"
                  >
                    {/* Room Name */}
                    <td className="py-3 px-4 font-medium text-neutral-800 dark:text-neutral-100">
                      {room.name}
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-neutral-400" />
                        <span>{room.location.city}</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {room.location.address}, {room.location.region}
                      </p>
                    </td>

                    {/* Smart Lock */}
                    <td className="py-3 px-4">
                      {room.smartLock ? (
                        <Badge className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600">
                          Yes
                        </Badge>
                      ) : (
                        <Badge className="bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                          No
                        </Badge>
                      )}
                    </td>

                    {/* Status */}
                   <td className="py-3 px-4 font-medium">
  {room.status === "Locked" && (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm
                 bg-neutral-100 text-neutral-700 border border-neutral-200
                 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
    >
      <Lock className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" /> Locked
    </motion.span>
  )}

  {room.status === "Unlocked" && (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm
                 bg-neutral-100 text-neutral-700 border border-neutral-200
                 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
    >
      <Unlock className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" /> Unlocked
    </motion.span>
  )}

  {room.status === "Manually Locked" && (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm
                 bg-neutral-100 text-neutral-700 border border-neutral-200
                 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
    >
      <KeyRound className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" /> Manual
    </motion.span>
  )}
</td>

                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center text-neutral-500 dark:text-neutral-400"
                  >
                    No rooms found matching your filters.
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
