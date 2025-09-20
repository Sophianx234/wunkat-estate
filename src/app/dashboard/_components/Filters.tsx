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
import { FaSearch, FaRedo, FaHome, FaMapMarkerAlt, FaCheckCircle, FaEraser, FaTimesCircle } from "react-icons/fa";

type FiltersProps = {
  onFilter: (filters: {
    search: string;
    type: string;
    city: string;
    status: string;
  }) => void;
};

export default function Filters({ onFilter }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ search, type, city, status });
  };

  const handleReset = () => {
    setSearch("");
    setType("");
    setCity("");
    setStatus("");
    onFilter({ search: "", type: "", city: "", status: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100 mb-8"
    >
      {/* 🔍 Search */}
      <div className="sm:col-span-2 relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm rounded-lg"
        />
      </div>
<div className="flex items-center gap-3">

      {/* 🏠 Property Type */}
      <div className="relative ">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="pl-9 text-sm rounded-lg">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <SelectContent>
            <SelectItem value="room">Room</SelectItem>
            <SelectItem value="house">House</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 📍 Location */}
      <div className="relative">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="pl-9 text-sm rounded-lg">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <SelectContent>
            <SelectItem value="accra">Accra</SelectItem>
            <SelectItem value="kumasi">Kumasi</SelectItem>
            <SelectItem value="tamale">Tamale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ✅ Status */}
      <div className="relative">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="pl-9 text-sm rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
          </div>

      {/* Buttons */}
        
       <Button
  type="button"
  variant="outline"
  onClick={handleReset}
  className="text-sm px-4 py-2 rounded-lg flex items-center gap-2"
>
  <FaTimesCircle className="w-4 h-4" />
  Reset
</Button>
    </form>
  );
}
