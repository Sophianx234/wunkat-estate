"use client";

import { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
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

  // 🔁 Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification/all");
        const data = await res.json();

        if (data.success) {
          setNotifications(data.notifications);
        } else {
          console.error("Failed to load notifications:", data.error);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // ➕ Create notification (sent to backend)
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Failed to create notification.",
        });
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Could not reach the server.",
      });
    }
  };

  // 🗑️ Delete notification (local only for now)
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
    const res = await fetch(`/api/notification/all/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok && data.success) {
      setNotifications((prev) => prev.filter((n) => n._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.error || "Failed to delete notification.",
      });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    Swal.fire({
      icon: "error",
      title: "Request Failed",
      text: "Could not reach the server.",
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
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h2>
        </div>

        <CreateNotificationDialog onCreate={handleCreate} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Types" />
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
        <Badge variant="outline">{filtered.length} Total</Badge>
      </div>

      {/* Notifications List */}
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          Loading notifications...
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {filtered.length > 0 ? (
            filtered.map((n) => (
              <motion.div
                key={n._id}
                className="border border-gray-300 dark:border-neutral-800 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/40 transition group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {n.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {n.message}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {n.type}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {n.audience}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(n._id)}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No notifications found.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
