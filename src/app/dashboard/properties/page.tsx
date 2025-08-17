'use client';

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../_components/Button";
import Filters from "../_components/Filters";
import PropertyCard from "../_components/PropertyCard";
import AddProperty from "../_components/AddProperty";
import dynamic from 'next/dynamic';
import { useDashStore } from "@/lib/store";
import AddHouse from "../_components/AddHouse";

const ExpandedProperty = dynamic(() => import('../_components/ExpandedProperty'), {
  ssr: false,
});

interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  images: string[];
  beds:number;
  baths:number;
  houseId?: {
    name: string;
    location: {
                address: string,
                city: string,
                region: string,
                country: string,
                _id: string
            }
  };
}


export default function Dashboard() {
  const { openAddProperty, toggleAddProperty, openExpandedProperty, openAddHouse, toggleAddHouse } = useDashStore();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  console.log('roomsx',rooms)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
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
    <main className="flex-1 grid-cols-1 sm:mt-8 px-8 py-6 pt-32 sm:pt-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Properties</h2>
        <div className="flex items-center gap-3">
          <Button
            onClick={toggleAddProperty}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <FaPlus /> Add Property
          </Button>
          <Button
            onClick={toggleAddHouse}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <FaPlus /> House
          </Button>
        </div>
      </div>

      {openAddProperty && <AddProperty />}
      {openAddHouse && <AddHouse />}

      <Filters />

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <PropertyCard
              key={room._id}
              property={{
                description: room.description,
                id: room._id,

                name: room.name,
                location: room.houseId?.location ,
                beds: room.beds || 0, // If you have beds in your schema, replace this
                baths: room.baths || 0, // If you have baths in your schema, replace this
                size: "",
                price: `$${room.price}`,
                image: room.images[0] || "/placeholder.jpg",
                status: room.available ? "available" : "booked",
              }}
            />
          ))}
        </div>
      )}

      {openExpandedProperty && <ExpandedProperty />}
    </main>
  );
}
