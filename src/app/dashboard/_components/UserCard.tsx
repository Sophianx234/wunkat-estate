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

const MySwal = withReactContent(Swal);

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

type UserProps = {
  user: userDocumentType;
};

// Handle role change
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
  const rolePrivileges: Record<"buyer" | "seller" | "agent" | "admin", string> =
    {
      buyer: "can browse properties and make purchase requests",
      seller: "can list and manage their properties for sale",
      agent: "can manage property listings and connect buyers with sellers",
      admin: "has full access to manage users, properties, and system settings",
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

      Toast.fire({
        icon: "success",
        title: `Role updated to ${updatedUser.role}`,
      });
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: "Error updating role",
      });
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

      Toast.fire({
        icon: "success",
        title: "User updated successfully",
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: "Error updating user",
      });
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
      const res = await fetch(`/api/user/${user._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      Toast.fire({
        icon: "success",
        title: `${user.name} deleted successfully`,
      });

      // Optional: refresh list after deletion
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: "Error deleting user",
      });
    }
  };

return (
  <div className="w-full h-full relative rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-4 overflow-hidden">
    {/* Accent */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />

    {/* Availability */}
    <div className="w-full flex justify-between items-center text-xs mb-3 mt-1">
      <Badge
        className={`px-2 py-0.5 rounded-full text-[10px] font-medium shadow-sm ${
          user.role === "buyer"
            ? "bg-green-100 text-green-700"
            : user.role === "seller"
            ? "bg-indigo-100 text-indigo-700"
            : user.role === "agent"
            ? "bg-blue-100 text-blue-700"
            : user.role === "admin"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {user.role}
      </Badge>
      <span className="text-gray-400 font-mono text-[10px]">
        #{(user?._id as string).slice(-6)}
      </span>
    </div>

    {/* User Image */}
    <div className="relative w-20 h-20 mb-3 mx-auto">
      <Image
        src={user.avatar|| user.profile || "/default-avatar.png"}
        alt={user.name}
        fill
        className="rounded-full object-cover border-2 border-gray-200 shadow-sm"
      />
    </div>

    {/* Info */}
    <h2 className="text-lg font-semibold text-gray-900 text-center">
      {user.name}
    </h2>
    <p className="text-gray-500 text-xs mt-0.5 text-center">{user.email}</p>

    {/* Role Select */}
    <div className="mt-3 w-36 mx-auto">
      <Select value={userRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-full border-gray-300 focus:ring-0 shadow-sm text-xs h-8">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="buyer">Buyer</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Description */}
    <p className="text-[11px] text-gray-600 mt-2 leading-snug text-center">
      {user.name} {rolePrivileges[userRole]}.
    </p>

    {/* ✅ Buttons fixed at bottom */}
    <div className="mt-auto pt-3 w-full flex justify-between gap-2">
      {/* Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm text-xs h-8"
          >
            <Pencil size={14} className="mr-1" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
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
        className="flex-1 shadow-sm text-xs h-8"
        onClick={handleDelete}
      >
        <Trash2 size={14} className="mr-1" /> Delete
      </Button>
    </div>
  </div>
);


}
