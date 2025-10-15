"use client";

import { useState } from "react";
import { Bell, Trash2, Plus } from "lucide-react";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function DashboardNotifications() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // 🔔 Mock Notifications
  const [notifications, setNotifications] = useState([
    {
      _id: "1",
      title: "Scheduled Maintenance",
      message:
        "There will be a water supply interruption in Block B tomorrow from 9 AM to 12 PM.",
      type: "maintenance",
      createdAt: "2025-10-13T08:00:00Z",
    },
    {
      _id: "2",
      title: "Payment Reminder",
      message:
        "Your subscription payment for October is due in 2 days. Kindly renew to avoid service interruption.",
      type: "payment",
      createdAt: "2025-10-12T11:45:00Z",
    },
    {
      _id: "3",
      title: "Room Booking Confirmed",
      message:
        "Your booking for Room 23 has been approved. Welcome to WunkatHomes!",
      type: "booking",
      createdAt: "2025-10-10T14:30:00Z",
    },
  ]);

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "system",
  });

  // 🗑️ Handle Delete Notification
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete Notification?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The notification has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // ➕ Handle Create Notification
  const handleCreate = () => {
    if (!newNotification.title || !newNotification.message) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields before creating a notification.",
      });
      return;
    }

    const newNotif = {
      _id: Date.now().toString(),
      ...newNotification,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setNewNotification({ title: "", message: "", type: "system" });
    setOpen(false);

    Swal.fire({
      icon: "success",
      title: "Notification Created",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // 🔍 Filter + Search
  const filtered = notifications.filter(
    (n) =>
      (filter === "all" || n.type === filter) &&
      (n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.message.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h2>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <Input
                placeholder="Notification Title"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Notification Message"
                rows={4}
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, message: e.target.value })
                }
              />
              <Select
                value={newNotification.type}
                onValueChange={(value) =>
                  setNewNotification({ ...newNotification, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3  justify-between items-center">
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

      {/* Notification List */}
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
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
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
                    <span
                      className={`text-xs px-2 py-1 rounded-full capitalize ${
                        n.type === "maintenance"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-300"
                          : n.type === "payment"
                          ? "bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-300"
                          : n.type === "booking"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300"
                      }`}
                    >
                      {n.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* 🗑️ Delete Button */}
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
    </div>
  );
}
