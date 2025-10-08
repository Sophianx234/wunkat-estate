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
  // const [users, setUsers] = useState<any[]>([]);
  const {setUsers} = useDashStore()

  const handleApply = async () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (role) params.append("role", role);
    if (date) params.append("date", date.toISOString().split("T")[0]); // YYYY-MM-DD

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

  const handleReset = async () => {
    setSearch("");
    setRole(undefined);
    setDate(null);
    setUsers(null)
    
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4 items-center">
      {/* Search */}
      <Input
        placeholder="Search by name, email or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:w-1/3"
      />

      {/* Role */}
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="buyer">Tenant</SelectItem>
          <SelectItem value="seller">Visitor</SelectItem>
          <SelectItem value="agent">Agent</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] justify-start text-left font-normal"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date ? date.toDateString() : "Filter by date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Buttons */}
      <div className="flex gap-2 ml-auto">
        <Button onClick={handleApply}><FiFilter /> Apply</Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-1"
        >
          <X size={14} /> Reset
        </Button>
      </div>

      {/* Result preview */}
     
    </div>
  );
}
