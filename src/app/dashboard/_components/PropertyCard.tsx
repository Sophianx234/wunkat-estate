'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBath, FaBed } from "react-icons/fa";
import { IRoom } from "../properties/page";

type propertyCardProps = {
  room:IRoom
};

export default function PropertyCard({ room }: propertyCardProps) {
  const router = useRouter();

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700";
      case "booked":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
 const status =  room.available ? "available" : "booked"
  const handleReadMore = () => {
    router.push(`properties/${room._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative hover:shadow-lg transition flex flex-col h-full">
      {/* Image + Badge */}
      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
        <Image
          src={room?.images[0]}
          alt={room.name}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-sm mb-1">{room.name}</h3>
        <p className="text-xs text-gray-500 mb-2">
          {room?.houseId?.location?.city} - {room?.houseId?.location?.region}
        </p>
        <p className="text-xs text-gray-500 mb-2 line-clamp-3">
          {room?.description}
        </p>
<div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-500" />
            <span>{room.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" />
            <span>{room.baths} Baths</span>
          </div>
            {/* <span>{room?.house?.size}</span> */}
          
        </div>
        {/* Footer pinned at bottom */}
        <div className="mt-auto flex  justify-between items-center text-sm pt-2">
          <span className="font-semibold text-gray-800 flex-col flex leading-tight">{room.price}<span className="italic text-xs font-medium text-gray-500">
            {room?.planType.includes("m") ? "/month" : "/year"}
          </span></span>
          <Button
          disabled={!room.available}
            onClick={handleReadMore}
            className="text-white text-xs font-medium px-4 py-1"
          >
           View & Book
          </Button>
        </div>
      </div>
    </div>
  );
}
