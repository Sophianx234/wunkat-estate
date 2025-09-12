'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBath, FaBed } from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";

type propertyCardProps = {
  property: {
    id: string;
    image: string;
    description: string;
    name: string;
    location?: {
      address: string;
      city: string;
      region: string;
      country: string;
      _id: string;
    };
    beds: number;
    baths: number;
    size: string;
    price: string;
    status: "available" | "booked" | "pending";
    plantype: string;
  };
};

export default function PropertyCard({ property }: propertyCardProps) {
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

  const handleReadMore = () => {
    router.push(`properties/${property.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative hover:shadow-lg transition flex flex-col h-full">
      {/* Image + Badge */}
      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
            property.status
          )}`}
        >
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-semibold text-sm mb-1">{property.name}</h3>
        <p className="text-xs text-gray-500 mb-2">
          {property?.location?.city} - {property?.location?.region}
        </p>
        <p className="text-xs text-gray-500 mb-2 line-clamp-3">
          {property?.description}
        </p>
<div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-500" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" />
            <span>{property.baths} Baths</span>
          </div>
            <span>{property.size}</span>
          
        </div>
        {/* Footer pinned at bottom */}
        <div className="mt-auto flex  justify-between items-center text-sm pt-2">
          <span className="font-semibold text-gray-800 flex-col flex leading-tight">{property.price}<span className="italic text-xs font-medium text-gray-500">
            {property?.plantype.includes("m") ? "/month" : "/year"}
          </span></span>
          <Button
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
