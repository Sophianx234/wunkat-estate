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
import { Pencil, Trash2, Eye } from "lucide-react";

type UserProps = {
  _id: string;
  name: string;
  email: string;
  role: "buyer" | "admin";
  profile: string;
  available?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
};

export default function UserCard({
  _id,
  name,
  email,
  role,
  profile,
  available = true,
  onEdit,
  onDelete,
  onView,
}: UserProps) {
  const [userRole, setUserRole] = useState(role);

  return (
    <div className="w-80 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-6 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />

      {/* Availability */}
      <div className="w-full flex justify-between items-center text-sm mb-4 mt-2">
        <Badge
          className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
            available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
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

      {/* User Info */}
      <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
      <p className="text-gray-500 text-sm mt-1">{email}</p>

      {/* Role Select (Shadcn) */}
      <div className="mt-5 w-44">
        <Select value={userRole} onValueChange={setUserRole}>
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
        platform. Manage their account or view details below.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 w-full flex justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm"
          onClick={() => onView?.(_id)}
        >
          <Eye size={16} className="mr-1" /> View
        </Button>

        <Button
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm"
          onClick={() => onEdit?.(_id)}
        >
          <Pencil size={16} className="mr-1" /> Edit
        </Button>

        <Button
          variant="destructive"
          className="flex-1 shadow-sm"
          onClick={() => onDelete?.(_id)}
        >
          <Trash2 size={16} className="mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
}
