"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { userDocumentType } from "@/models/User";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

type TeamMembersCardProps = {
  type?: "admin" | "user";
  onClose?: () => void;
};

export default function TeamMembersCard({
  type = "user",
  onClose,
}: TeamMembersCardProps) {
  const [members, setMembers] = useState<userDocumentType[]>([]);
  const [loading, setLoading] = useState(true);

   const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user?role=admin", { cache: "no-store" }); 
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleRoleChange = async (userId: string, newRole: "buyer" | "admin") => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: `Do you want to change this user's role to ${newRole}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      const res = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to change role");
      const updatedUser = await res.json();

      Toast.fire({
        icon: "success",
        title: `Role updated to ${updatedUser.role}`,
      });

      // ✅ Re-fetch updated list instead of local patch
      await fetchAdmins();
    } catch (err) {
      console.error(err);
      Toast.fire({
        icon: "error",
        title: "Error updating role",
      });
    }
  };
  if (loading) {
    return <p className="text-gray-500">Loading team members...</p>;
  }

  if (members.length === 0) {
    return <p className="text-gray-500">No team members found</p>;
  }

  return (
    <Card className="w-full h-fit max-w-sm rounded-xl shadow relative">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            These administrators are part of your core team.
          </CardDescription>
        </div>

        {type === "admin" && onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between gap-2"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={member.avatar || member.profile}
                  alt={member.name}
                />
                <AvatarFallback>
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>

            {/* Role Select */}
            <Select
              value={member.role}
              onValueChange={(val) =>
                handleRoleChange(member._id!, val as "buyer" | "admin")
              }
            >
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
