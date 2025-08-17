'use client';
import { Button } from "@/components/ui/button";
import { useDashStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

type propertyCardProps = {
  property: {
    id: string;
    image: string;
    description:string
    name: string;
    location?: {
                address: string,
                city: string,
                region: string,
                country: string,
                _id: string
            };
    beds: number;
    baths: number;
    size: string;
    price: string;
    status: "available" | "booked" | "pending";
  };
};

export default function PropertyCard({ property }: propertyCardProps) {
  const { toggleExpandedProperty } = useDashStore();
  const router = useRouter()

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

  const handleReadMore = ()=>{
    router.push(`properties/${property.id}`)


  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 relative hover:shadow-lg transition">
      <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
        {/* Image */}
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />

        {/* Status Badge */}
        <span
          className={`absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
            'pending'
          )}`}
        >
          {/* {property.status.charAt(0).toUpperCase() + property.status.slice(1)} */}
          Pending
        </span>
      </div>

      {/* Property Info */}
      <h3 className="font-semibold text-sm mb-1">{property.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{property?.location?.city} - {property?.location?.region}</p>
      <p className="text-xs text-gray-500 mb-2">{property?.description}</p>

      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
        <span>{property.beds} Beds</span>
        <span>{property.baths} Baths</span>
        <span>{property.size}</span>
      </div>

      {/* Price & CTA */}
      <div className="flex justify-between items-center text-sm mt-2">
        <span className="font-semibold text-gray-800">{property.price}</span>
        <Button
          onClick={handleReadMore}
          className="text-white text-xs font-medium px-4 py-1"
        >
          Read more
        </Button>
      </div>
    </div>
  );
}
