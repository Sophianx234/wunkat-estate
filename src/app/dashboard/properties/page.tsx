"use client";

import { useDashStore } from "@/lib/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Filters from "../_components/Filters";
import PropertyCard from "../_components/PropertyCard";
import { ScaleLoader } from "react-spinners";

const ExpandedProperty = dynamic(
  () => import("../_components/ExpandedProperty"),
  { ssr: false }
);

export interface IRoom {
  _id: string;
  name: string;
  description: string;
  price: number;
  available?: boolean;
  images: string[];
  beds: number;
  baths: number;
  planType: string;
  status: string;
  houseId?: {
    _id: string;
    name: string;
    location: {
      address: string;
      city: string;
      region: string;
      country: string;
      _id: string;
    };
  };
}

export type propertiesPageProps = {
  type?: "admin" | "user";
};

export default function PropertiesPage({ type = "user" }: propertiesPageProps) {
  const { openExpandedProperty, filteredRooms } = useDashStore();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/rooms`);
        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 pt-28 sm:pt-6 relative">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">
          {type === "admin" ? "Manage Rooms" : "Properties"}
        </h2>

        {type === "admin" && (
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/properties/add-property"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaPlus /> Add Property
            </Link>
            <Link
              href="/dashboard/properties/add-house"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaPlus /> House
            </Link>
          </div>
        )}
      </div>

      {/* Filters */}
      <Filters type={type} />

      {/* Loader / Results */}
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <ScaleLoader color="#868e96" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms ? (
            filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <PropertyCard type={type} key={room._id} room={room} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No results match your filters.
                <br />
                Press <span className="font-semibold">Reset</span> to see all
                rooms again.
              </p>
            )
          ) : (
            rooms.map((room) => (
              <PropertyCard type={type} key={room._id} room={room} />
            ))
          )}
        </div>
      )}

      {/* Expanded Property Modal */}
      {openExpandedProperty && <ExpandedProperty />}
    </main>
  );
}
