"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, X } from "lucide-react";
import { FiFilter } from "react-icons/fi";
import { useDashStore } from "@/lib/store";

export default function UserFilter() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | undefined>();
  const [date, setDate] = useState<Date | null>(null);
  const { setUsers } = useDashStore();

  const handleApply = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (role) params.append("role", role);
    if (date) params.append("date", date.toISOString().split("T")[0]);

    try {
      const res = await fetch(`/api/user?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      console.log("Filtered users:", data);
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setSearch("");
    setRole(undefined);
    setDate(null);
    setUsers(null);
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-wrap md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
        {/* 🔍 Search */}
        <Input
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 md:w-1/3"
        />

        {/* 🧑‍ Roles */}
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Tenant</SelectItem>
            <SelectItem value="seller">Visitor</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        {/* 📅 Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[200px] justify-start text-left font-normal"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {date ? date.toDateString() : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar
              mode="single"
              selected={date || undefined}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* 🎯 Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto w-full sm:w-auto">
          <Button onClick={handleApply} className="flex items-center gap-2 justify-center">
            <FiFilter className="h-4 w-4" /> Apply
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-1 justify-center"
          >
            <X size={14} /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
