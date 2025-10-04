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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { GiRoundKnob } from "react-icons/gi";
import { RiMenu4Line } from "react-icons/ri";
import { ghanaRegions } from "../properties/add-house/page";
import { useDashStore } from "@/lib/store";

type FiltersProps = {
  type?: 'admin' | 'user';  
};

export default function Filters({ type = 'user' }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [smartLock, setSmartLock] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const {setFilteredRooms}  = useDashStore()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ build query params safely
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (smartLock) params.set("smartLock", smartLock); // renamed from type → smartLock
  if (city) params.set("city", city);
  if (status) params.set("status", status);

  // ✅ only users should filter by availability
  if (type === "user") {
    params.set("type", "available"); // renamed from type=available → availability
  }

  const queryString = params.toString();

  // ✅ push to URL
  router.push(`?${queryString}`);

  try {
    // ✅ request filtered rooms from backend
    const res = await fetch(`/api/rooms?${queryString}`);
    const data = await res.json();

    if (res.ok) {
      console.log("data", data);
      setFilteredRooms(data);
    } else {
      console.error("Error fetching rooms:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};


  const handleReset = () => {
    setSearch("");
    setSmartLock("");
    setCity("");
    setStatus("");
    setFilteredRooms(null);
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
        <Select value={smartLock} onValueChange={setSmartLock}>
          <SelectTrigger className="pl-9 text-sm rounded-lg">
            <SelectValue placeholder="Smart Lock" />
          </SelectTrigger>
          <GiRoundKnob className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <SelectContent>
            <SelectItem value="true">True</SelectItem>
            <SelectItem value="false">False</SelectItem>
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
            {ghanaRegions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
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
  variant="outline"
  
  className="text-sm px-4 py-2 rounded-lg flex items-center gap-2"
>
  <FiFilter className="w-4 h-4" />
  Filter
</Button>
       <Button
  type="button"
  variant="outline"
  onClick={handleReset}
  className="text-sm px-4 py-2 rounded-lg flex items-center gap-2"
>
  <RiMenu4Line className="w-4 h-4" />
  Reset
</Button>
    </form>
  );
}
