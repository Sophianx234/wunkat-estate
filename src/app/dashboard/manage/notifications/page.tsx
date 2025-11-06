"use client";

import { useEffect, useState } from "react";
import { Bell, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { CreateNotificationDialog } from "@/app/_components/CreateNotification";
import { ScaleLoader } from "react-spinners";

export default function DashboardNotifications() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  // 🔁 Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification/all");
        const data = await res.json();
        if (data.success) setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // ➕ Create notification
  const handleCreate = async (newNotif: any) => {
    try {
      const res = await fetch("/api/notification/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotif),
      });
      const data = await res.json();

      if (data.success) {
        setNotifications((prev) => [data.notification, ...prev]);
        Swal.fire({
          icon: "success",
          title: "Notification Created",
          timer: 1200,
          showConfirmButton: false,
        });
      } else throw new Error(data.error || "Failed to create notification.");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: (error as Error).message,
      });
    }
  };

  // 🗑️ Delete notification
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Notification?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/notification/all/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1000,
          showConfirmButton: false,
        });
      } else throw new Error(data.error || "Failed to delete notification.");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: (error as Error).message,
      });
    }
  };

  // 🔍 Filter + Search
  const filtered = notifications.filter(
    (n) =>
      (filter === "all" || n.type === filter) &&
      (n.title?.toLowerCase().includes(search.toLowerCase()) ||
        n.message?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="px-4 md:px-6 py-6 pt-10 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Manage Notifications
        </h1>
        <div className="self-start sm:self-end">
          <CreateNotificationDialog onCreate={handleCreate} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Search + Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-[220px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm w-full"
            />
          </div>
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="text-sm w-full sm:w-[160px]">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right: Badge */}
        <div className="flex justify-end sm:justify-center">
          <Badge
            variant="secondary"
            className="text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300 whitespace-nowrap"
          >
            {filtered.length} {filtered.length === 1 ? "Notification" : "Notifications"}
          </Badge>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <ScaleLoader color="#6b7280" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <Bell className="mx-auto mb-2 w-6 h-6 text-gray-400" />
          <p className="text-sm">No notifications found.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            md:gap-6
          "
        >
          {filtered.map((n) => (
            <motion.div
              key={n._id}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                    {n.message}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(n._id)}
                  className="text-gray-400 hover:text-red-500 hover:bg-transparent transition"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant="outline" className="capitalize">
                  {n.type}
                </Badge>
                <Badge
                  variant="secondary"
                  className="capitalize bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300"
                >
                  {n.audience}
                </Badge>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
