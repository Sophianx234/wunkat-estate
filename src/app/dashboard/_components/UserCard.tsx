"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userDocumentType } from "@/models/User";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

type UserProps = {
  user: userDocumentType;
};

const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default function UserCard({ user }: UserProps) {
  const [userRole, setUserRole] = useState(user.role);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name);
  const [newEmail, setNewEmail] = useState(user?.email);
  const router = useRouter();

  const rolePrivileges: Record<"buyer" | "seller" | "agent" | "admin", string> = {
    buyer: "Can browse listings and make purchase requests",
    seller: "Can list and manage properties for sale",
    agent: "Can manage listings and connect buyers with sellers",
    admin: "Full access to manage users, listings, and settings",
  };

  // ✅ Handle role change
  const handleRoleChange = async (newRole: "buyer" | "admin") => {
    if (newRole === userRole) return;

    try {
      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to change role");
      const updatedUser = await res.json();

      setUserRole(updatedUser.role);
      Toast.fire({ icon: "success", title: `Role updated to ${updatedUser.role}` });
    } catch {
      Toast.fire({ icon: "error", title: "Error updating role" });
    }
  };

  // ✅ Handle edit submit
  const handleEditSubmit = async () => {
    if (!newName.trim() && !newEmail.trim()) return;

    try {
      const res = await fetch(`/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser = await res.json();

      setOpen(false);
      setNewName(updatedUser.name);
      setNewEmail(updatedUser.email);

      Toast.fire({ icon: "success", title: "User updated successfully" });
      router.refresh();
    } catch {
      Toast.fire({ icon: "error", title: "Error updating user" });
    }
  };

  // ✅ Handle delete
  const handleDelete = async () => {
    const confirmDelete = await MySwal.fire({
      title: "Delete User?",
      text: `This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await fetch(`/api/user/${user._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");

      Toast.fire({ icon: "success", title: `${user.name} deleted successfully` });
    } catch {
      Toast.fire({ icon: "error", title: "Error deleting user" });
    }
  };

  return (
    <div className="relative w-full h-full bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 p-6 flex flex-col">
      {/* Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <Badge
          className={`capitalize px-3 py-1 text-[11px] font-semibold rounded-full ${
            user.role === "buyer"
              ? "bg-green-100 text-green-700"
              : user.role === "seller"
              ? "bg-indigo-100 text-indigo-700"
              : user.role === "agent"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {userRole}
        </Badge>
        <span className="text-[10px] text-gray-400 font-mono tracking-widest">
          #{(user?._id as string).slice(-6)}
        </span>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20">
          <Image
            src={user.avatar || user.profile || "/default-avatar.png"}
            alt={user.name}
            fill
            className="rounded-full object-cover border border-gray-200 shadow-sm"
          />
        </div>
      </div>

      {/* Name & Email */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
          {user.name}
        </h2>
        <p className="text-sm text-gray-500 font-medium">{user.email}</p>
      </div>

      {/* Role Selector */}
      <div className="mt-4 w-40 mx-auto">
        <Select value={userRole} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full border-gray-300 text-xs font-medium focus:ring-0 shadow-sm">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <p className="mt-3 text-xs text-gray-600 text-center leading-relaxed">
        <span className="font-semibold">{user.name.split(" ")[0]}</span>{" "}
        {rolePrivileges[userRole]}.
      </p>

      {/* Action Buttons */}
      <div className="mt-auto pt-4 flex gap-2">
        {/* Edit */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 text-xs font-medium border-gray-300 hover:bg-gray-100"
            >
              <Pencil size={14} className="mr-1" /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-1">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete */}
        <Button
          variant="destructive"
          className="flex-1 text-xs font-medium"
          onClick={handleDelete}
        >
          <Trash2 size={14} className="mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
