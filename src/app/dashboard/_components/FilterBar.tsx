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

import {
  HiOutlineMagnifyingGlass,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { MdLockOutline, MdLockOpen, MdClear } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

type FilterValues = {
  search: string;
  rentStatus: string;
  lockStatus: string;
};

export default function FilterBar() {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    rentStatus: "",
    lockStatus: "",
  });

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Update filters in state
  const handleChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Call backend
  const fetchPayments = async (body: FilterValues) => {
    try {
      setLoading(true);
      const res = await fetch("/api/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("❌ Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply filters
  const applyFilters = async() => {
    await fetchPayments(filters);
  };

  // ✅ Clear filters
  const clearFilters = () => {
    const reset = { search: "", rentStatus: "", lockStatus: "" };
    setFilters(reset);
    fetchPayments(reset);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Controls */}
      <div
        className="flex flex-col sm:flex-row gap-4 
                   p-5 rounded-3xl shadow-sm border border-gray-100 items-center"
      >
        {/* Search */}
        <div className="relative flex-1 w-full">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search by name, email, or room..."
            className="pl-10 border-gray-200"
          />
        </div>

        {/* Rent Status */}
        <Select
          value={filters.rentStatus}
          onValueChange={(val) => handleChange("rentStatus", val)}
        >
          <SelectTrigger className="sm:w-44 rounded-sm border-gray-200">
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
          <SelectTrigger className="sm:w-44 rounded-sm border-gray-200">
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

        {/* Apply Filters */}
        <Button
          variant="outline"
          onClick={applyFilters}
          className="text-sm px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiFilter className="w-4 h-4" />
          Filter
        </Button>

        {/* Clear */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="flex items-center gap-2 rounded-lg bg-black text-white border-gray-200 hover:bg-gray-800 hover:text-white transition-all"
        >
          <MdClear className="w-5 h-5" /> Clear
        </Button>
      </div>

      
    </div>
  );
}
