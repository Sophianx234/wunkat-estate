"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCheckCircle, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { GiRoundKnob } from "react-icons/gi";
import { RiMenu4Line } from "react-icons/ri";
import { ghanaRegions } from "../properties/add-house/page";
import { useDashStore } from "@/lib/store";
import { Loader2 } from "lucide-react"; // <-- simple modern loader icon

type FiltersProps = {
  type?: "admin" | "user";
};

export default function Filters({ type = "user" }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [smartLock, setSmartLock] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // <-- new state
  const router = useRouter();
  const { setFilteredRooms } = useDashStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loader

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (smartLock) params.set("smartLock", smartLock);
    if (city) params.set("city", city);
    if (status) params.set("status", status);

    const queryString = params.toString();
    router.push(`?${queryString}`);

    try {
      const res = await fetch(`/api/rooms?${queryString}`);
      const data = await res.json();
      if (res.ok) setFilteredRooms(data);
      else console.error("Error fetching rooms:", data.error);
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false); // stop loader
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
      className="flex flex-col gap-4 md:flex-row md:flex-wrap bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100 mb-8 w-full"
    >
      {/* Search Field */}
      <div className="relative w-full md:flex-1">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm rounded-lg w-full"
          disabled={loading}
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-wrap">
        {/* Smart Lock */}
        <div className="relative flex-1 min-w-[140px] sm:min-w-[150px]">
          <Select value={smartLock} onValueChange={setSmartLock} disabled={loading}>
            <SelectTrigger className="pl-9 text-sm rounded-lg w-full">
              <SelectValue placeholder="Smart Lock" />
            </SelectTrigger>
            <GiRoundKnob className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="relative flex-1 min-w-[140px] sm:min-w-[150px]">
          <Select value={city} onValueChange={setCity} disabled={loading}>
            <SelectTrigger className="pl-9 text-sm rounded-lg w-full">
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

        {/* Status */}
        <div className="relative flex-1 min-w-[140px] sm:min-w-[150px]">
          <Select value={status} onValueChange={setStatus} disabled={loading}>
            <SelectTrigger className="pl-9 text-sm rounded-lg w-full">
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
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto justify-end sm:justify-start">
        <Button
          type="submit"
          variant="outline"
          disabled={loading}
          className="text-sm px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <FiFilter className="w-4 h-4" />
              Filter
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={loading}
          className="text-sm px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <RiMenu4Line className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </form>
  );
}
