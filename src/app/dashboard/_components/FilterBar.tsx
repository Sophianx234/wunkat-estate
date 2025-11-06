"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMagnifyingGlass,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { MdClear, MdLockOpen, MdLockOutline } from "react-icons/md";

type FilterValues = {
  search: string;
  rentStatus: string;
  lockStatus: string;
};

type filterBarProps = {
  onFilter: (filters: FilterValues) => void;
};

export default function FilterBar({ onFilter }: filterBarProps) {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    rentStatus: "",
    lockStatus: "",
  });

  // ✅ Update filters in state
  const handleChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Clear filters
  const clearFilters = () => {
    const reset = { search: "", rentStatus: "", lockStatus: "" };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Controls */}
      <div
        className="flex flex-col sm:flex-row sm:flex-wrap gap-4 
                   p-5 rounded-3xl shadow-sm border border-gray-100 items-center justify-center sm:justify-between"
      >
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search by name, email, or room..."
            className="pl-10 border-gray-200 w-full"
          />
        </div>

        {/* Rent Status */}
        <div className="w-full sm:w-44">
          <Select
            value={filters.rentStatus}
            onValueChange={(val) => handleChange("rentStatus", val)}
          >
            <SelectTrigger className="w-full rounded-sm border-gray-200">
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
        </div>

        {/* Lock Status */}
        <div className="w-full sm:w-44">
          <Select
            value={filters.lockStatus}
            onValueChange={(val) => handleChange("lockStatus", val)}
          >
            <SelectTrigger className="w-full rounded-sm border-gray-200">
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
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 justify-center sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onFilter(filters)}
            className="text-sm px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <FiFilter className="w-4 h-4" />
            Filter
          </Button>

          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-lg bg-black text-white border-gray-200 hover:bg-gray-800 hover:text-white transition-all w-full sm:w-auto"
          >
            <MdClear className="w-5 h-5" /> Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
