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

// ✅ New icons
import { HiOutlineMagnifyingGlass, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { MdLockOutline, MdLockOpen, MdClear } from "react-icons/md";

type FilterValues = {
  search: string;
  rentStatus: string;
  lockStatus: string;
};

type FilterBarProps = {
  onFilter: (filters: FilterValues) => void;
};

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    rentStatus: "",
    lockStatus: "",
  });

  const handleChange = (key: keyof FilterValues, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);
  };

  const clearFilters = () => {
    const reset = { search: "", rentStatus: "", lockStatus: "" };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-indigo-50 via-white to-pink-50 
                 p-5 rounded-3xl shadow-sm border border-gray-100 items-center"
    >
      {/* Search */}
      <div className="relative flex-1 w-full">
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Search by name, email, or room..."
          className="pl-10 rounded-full border-gray-200 focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Rent Status */}
      <Select
        value={filters.rentStatus}
        onValueChange={(val) => handleChange("rentStatus", val)}
      >
        <SelectTrigger className="sm:w-44 rounded-full border-gray-200 focus:ring-2 focus:ring-indigo-400">
          <SelectValue placeholder="Rent Status" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl shadow-lg">
          <SelectItem value="active">
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="text-green-500 w-5 h-5" /> Active
            </div>
          </SelectItem>
          <SelectItem value="due_soon">
            <div className="flex items-center gap-2">
              <HiOutlineClock className="text-yellow-500 w-5 h-5" /> Due Soon
            </div>
          </SelectItem>
          <SelectItem value="expired">
            <div className="flex items-center gap-2">
              <HiOutlineXCircle className="text-red-500 w-5 h-5" /> Expired
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Lock Status */}
      <Select
        value={filters.lockStatus}
        onValueChange={(val) => handleChange("lockStatus", val)}
      >
        <SelectTrigger className="sm:w-44 rounded-full border-gray-200 focus:ring-2 focus:ring-pink-400">
          <SelectValue placeholder="Lock Status" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl shadow-lg">
          <SelectItem value="locked">
            <div className="flex items-center gap-2">
              <MdLockOutline className="text-red-500 w-5 h-5" /> Locked
            </div>
          </SelectItem>
          <SelectItem value="unlocked">
            <div className="flex items-center gap-2">
              <MdLockOpen className="text-green-500 w-5 h-5" /> Unlocked
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Clear */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="flex items-center gap-2 rounded-full border-gray-200 hover:bg-indigo-100 transition-all"
      >
        <MdClear className="w-5 h-5" /> Clear
      </Button>
    </div>
  );
}
