"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashStore } from "@/lib/store";
import { useEffect, useMemo, useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { ghanaRegions } from "../properties/add-house/page";
import { IHouse } from "@/models/House";

type HouseFilterProps = {
  setIsLoading: (loading: boolean) => void;
  houses:IHouse[]
};

export default function HouseFilter({ setIsLoading,houses }: HouseFilterProps) {
  const {  setFilteredHouses } = useDashStore(); // 🧠 assuming houses exist in Zustand store
  const countries = ["Ghana"];
  const amenities = ["Pool", "WiFi", "Parking", "Gym"];

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [smartLockSupport, setSmartLockSupport] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [cities,setCities] = useState<string[]>([])

  // ✅ Derive unique cities from all houses
useEffect(() => {
  if (!houses?.length) return;

  // Extract and deduplicate cities efficiently
  const uniqueCities = Array.from(
    new Set(houses.map((h) => h.location?.city?.trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b)); // optional: sort alphabetically

  setCities(uniqueCities);
}, [houses]);

  
 // only recompute when count changes

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async () => {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (city) params.append("city", city);
    if (region) params.append("region", region);
    if (country) params.append("country", country);
    if (smartLockSupport !== "") params.append("smartLockSupport", smartLockSupport);
    selectedAmenities.forEach((a) => params.append("amenities", a));

    try {
      setIsLoading(true);
      const res = await fetch(`/api/houses?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch houses");

      const data = await res.json();
      console.log("Filtered houses:", data);
      setFilteredHouses(data);
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setCity("");
    setRegion("");
    setCountry("");
    setSmartLockSupport("");
    setSelectedAmenities([]);
    setFilteredHouses(null);
  };

  return (
    <div className="flex flex-wrap mb-5 items-center gap-3 p-3 border rounded-lg bg-card shadow-sm">
      {/* Search by name */}
      <Input
        placeholder="Search name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-40"
      />

      {/* City (Dynamic) */}
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          {cities.length === 0 ? (
            <SelectItem value="" disabled>
              No cities available
            </SelectItem>
          ) : (
            cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/* Region */}
      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent>
          {ghanaRegions.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Country */}
      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((ct) => (
            <SelectItem key={ct} value={ct}>
              {ct}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Smart Lock Support */}
      <Select
        value={smartLockSupport as string}
        onValueChange={(v) => setSmartLockSupport(v)}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Smart Lock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>

      {/* Amenities */}
      <div className="flex items-center gap-2 flex-wrap">
        {amenities.map((a) => (
          <div key={a} className="flex items-center gap-1">
            <Checkbox
              id={a}
              checked={selectedAmenities.includes(a)}
              onCheckedChange={() => toggleAmenity(a)}
            />
            <label htmlFor={a} className="text-xs">
              {a}
            </label>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <Button size="sm" onClick={handleSubmit}>
          <LiaFilterSolid className="size-4" />
          Apply
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
