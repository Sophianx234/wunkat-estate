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
import { useEffect, useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { ghanaRegions } from "../properties/add-house/page";
import { IHouse } from "@/models/House";

type HouseFilterProps = {
  setIsLoading: (loading: boolean) => void;
  houses: IHouse[];
};

export default function HouseFilter({ setIsLoading, houses }: HouseFilterProps) {
  const { setFilteredHouses } = useDashStore();
  const countries = ["Ghana"];
  const amenities = ["Pool", "WiFi", "Parking", "Gym"];

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [smartLockSupport, setSmartLockSupport] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // 🏙️ Extract unique cities
  useEffect(() => {
    if (!houses?.length) return;
    const uniqueCities = Array.from(
      new Set(houses.map((h) => h.location?.city?.trim()).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));
    setCities(uniqueCities);
  }, [houses]);

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
    <div className="p-4 border rounded-lg bg-card shadow-sm space-y-4">
      {/* 🔍 Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Search by name */}
        <Input
          placeholder="Search name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />

        {/* City */}
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-full">
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
          <SelectTrigger className="w-full">
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
          <SelectTrigger className="w-full">
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

        {/* Smart Lock */}
        <Select
          value={smartLockSupport as string}
          onValueChange={(v) => setSmartLockSupport(v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Smart Lock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🏠 Amenities */}
      <div className="flex flex-wrap gap-3">
        {amenities.map((a) => (
          <div key={a} className="flex items-center gap-2">
            <Checkbox
              id={a}
              checked={selectedAmenities.includes(a)}
              onCheckedChange={() => toggleAmenity(a)}
            />
            <label htmlFor={a} className="text-sm">
              {a}
            </label>
          </div>
        ))}
      </div>

      {/* 🎯 Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
        <Button size="sm" onClick={handleSubmit} className="flex items-center gap-1">
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
