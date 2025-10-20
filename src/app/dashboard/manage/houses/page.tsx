"use client";

import { IHouse } from "@/models/House";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HouseCard from "../../_components/HouseCard";
import { useRouter } from "next/navigation";
import HouseFilter from "../../_components/HouseFilter";
import { useDashStore } from "@/lib/store";

export default function Page() {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { filteredHouses } = useDashStore();

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

  const handleEditHouse = (houseId: string) => {
    router.push(`/dashboard/properties/add-house/edit/${houseId}`);
  };

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

  // Decide which data to render
 let displayHouses: IHouse[] = [];
let notFoundMessage: string | null = null;

if (filteredHouses === null || filteredHouses === undefined) {
  // show all houses
  displayHouses = houses;
  if (houses.length === 0) {
    notFoundMessage = "No houses found";
  }
} else if (Array.isArray(filteredHouses) && filteredHouses.length === 0) {
  // search ran but found nothing
  notFoundMessage = "Results not found";
} else if (Array.isArray(filteredHouses)) {
  // search returned results
  displayHouses = filteredHouses;
}


  return (
    <div className="p-6">
      <h1 className="text-lg mb-3 font-bold">Manage Houses</h1>
      {!loading &&<HouseFilter houses={houses} setIsLoading={setLoading} />}

      {loading ? (
        <p className="text-gray-500">Loading houses...</p>
      ) : notFoundMessage ? (
        <p className="text-gray-500">{notFoundMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayHouses.map((house) => (
            <HouseCard
              key={house._id}
              house={house}
              onEditHouse={handleEditHouse}
              onDeleteHouse={handleDeleteHouse}
            />
          ))}
        </div>
      )}
    </div>
  );
}
