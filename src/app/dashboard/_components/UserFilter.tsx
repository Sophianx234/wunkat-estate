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

type UserFilterProps = {
  onFilter?: (filters: {
    search?: string;
    role?: string;
    date?: Date | null;
  }) => void;
};

export default function UserFilter({ onFilter }: UserFilterProps) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | undefined>();
  const [date, setDate] = useState<Date | null>(null);

  const handleApply = () => {
    onFilter({ search, role, date });
  };

  const handleReset = () => {
    setSearch("");
    setRole(undefined);
    setDate(null);
    onFilter({});
  };

  return (
    <div className="w-full bg-white p-4  rounded-xl shadow flex flex-col md:flex-row gap-4 items-center">
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
        <Button onClick={handleApply}><FiFilter/> Apply</Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-1"
        >
          <X size={14} /> Reset
        </Button>
      </div>
    </div>
  );
}
