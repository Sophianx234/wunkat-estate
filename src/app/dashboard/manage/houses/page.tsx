"use client";

import { IHouse } from "@/models/House";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HouseCard from "../../_components/HouseCard";
import { useRouter } from "next/navigation";

export default function Page() {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch houses
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch("/api/houses", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch houses");
        const data = await res.json();
        console.log("Fetched houses:", data);
        setHouses(data);
      } catch (err) {
        console.error("Error fetching houses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  // Add/Edit/Room Handlers (can be expanded later)
  

  const handleEditHouse = (houseId: string) =>{
    router.push(`/dashboard/properties/add-house/edit/${houseId}`);
  }

  // ✅ Delete with SweetAlert + fetch
  const handleDeleteHouse = async (houseId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the house and its rooms.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/houses/${houseId}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete house");

        // Remove house from UI without reload
        setHouses((prev) => prev.filter((h) => h._id !== houseId));

        Swal.fire("Deleted!", "The house has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting house:", err);
        Swal.fire("Error", "Something went wrong while deleting.", "error");
      }
    }
  };

 

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-gray-500">Loading houses...</p>
      ) : houses.length === 0 ? (
        <p className="text-gray-500">No houses found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <HouseCard
              key={house._id}
              house={house}
              // onAddRoom={handleAddRoom}
              onEditHouse={handleEditHouse}
              onDeleteHouse={handleDeleteHouse} // ✅ wired up
              
            />
          ))}
        </div>
      )}
    </div>
  );
}
