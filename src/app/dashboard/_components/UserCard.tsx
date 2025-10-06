"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserProps = {
  _id: string;
  name: string;
  email: string;
  role: "buyer" | "admin";
  profile: string;
  available?: boolean;
  onEdit?: (id: string, updated: { name: string; email: string }) => void;
  onDelete?: (id: string) => void;
  onRoleChange?: (id: string, role: "buyer" | "admin") => void;
};

// Handle role change
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
export default function UserCard({
  _id,
  name,
  email,
  role,
  profile,
  available = true,

}: UserProps) {
  const [userRole, setUserRole] = useState(role);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);


  // ✅ Handle role change
  const handleRoleChange = async (newRole: "buyer" | "admin") => {
    if (newRole === userRole) return;

    try {
      const res = await fetch(`/api/users/${_id}`, {
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
      const res = await fetch(`/api/users/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser = await res.json();

      setNewName(updatedUser.name);
      setNewEmail(updatedUser.email);

      Toast.fire({
        icon: "success",
        title: "User updated successfully",
      });
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
      const res = await fetch(`/api/users/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      Toast.fire({
        icon: "success",
        title: `${name} deleted successfully`,
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
    <div className="w-full rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-6 relative overflow-hidden">
      {/* Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />

      {/* Availability */}
      <div className="w-full flex justify-between items-center text-sm mb-4 mt-2">
        <Badge
          className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
            available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {available ? "Available" : "Unavailable"}
        </Badge>
        <span className="text-gray-400 font-mono text-xs">#{_id.slice(-6)}</span>
      </div>

      {/* User Image */}
      <div className="relative w-28 h-28 mb-4">
        <Image
          src={profile}
          alt={name}
          fill
          className="rounded-full object-cover border-4 border-gray-200 shadow-sm"
        />
      </div>

      {/* Info */}
      <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
      <p className="text-gray-500 text-sm mt-1">{email}</p>

      {/* Role Select */}
      <div className="mt-5 w-44">
        <Select value={userRole} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full border-gray-300 focus:ring-0 shadow-sm">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-5 leading-relaxed">
        {name} is registered as a{" "}
        <span className="font-semibold text-gray-800">{userRole}</span> on our
        platform.
      </p>

      {/* Buttons */}
      <div className="mt-6 w-full flex justify-between gap-2">
        {/* Edit with Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm"
            >
              <Pencil size={16} className="mr-1" /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
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
          className="flex-1 shadow-sm"
          onClick={handleDelete}
        >
          <Trash2 size={16} className="mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
