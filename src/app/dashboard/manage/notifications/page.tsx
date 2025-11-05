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

  // ➕ Create new notification
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
      } else {
        throw new Error(data.error || "Failed to create notification.");
      }
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
      } else {
        throw new Error(data.error || "Failed to delete notification.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: (error as Error).message,
      });
    }
  };

  // 🔍 Filter & search
  const filtered = notifications.filter(
    (n) =>
      (filter === "all" || n.type === filter) &&
      (n.title?.toLowerCase().includes(search.toLowerCase()) ||
        n.message?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 mx-4 ml-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b mt-4 pb-3">
        <div className="font-bold text-xl">Manage Notifications</div>
        <CreateNotificationDialog onCreate={handleCreate} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[220px]"
            />
          </div>
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-[160px]">
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

        <Badge
          variant="secondary"
          className="text-sm font-medium bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
        >
          {filtered.length} {filtered.length === 1 ? "Notification" : "Notifications"}
        </Badge>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-center text-gray-500 text-sm py-6">
          Loading notifications...
        </p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Bell className="mx-auto mb-2 w-6 h-6 text-gray-400" />
          <p>No notifications found.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((n) => (
            <motion.div
              key={n._id}
              whileHover={{ scale: 1.01 }}
              className="relative rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition"
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
