import { Button } from "@/components/ui/button";
import Image from "next/image";
import ExpandedProperty from "./ExpandedProperty";
type propertyCardProps = {
  property: {
    id:number
    image: string;
    name: string;
    location: string;
    beds: number;
    baths: number;
    size: string;
    price: string;
  }
}
export default function PropertyCard({ property }:propertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="relative w-full  h-32 mb-2">

      <Image
        src={property.image}
        alt={property.name}
        fill
        className="rounded-lg mb-4 object-cover  "
        />
        </div>
      <h3 className="font-semibold text-sm mb-1">{property.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{property.location}</p>
      <div className="text-xs text-gray-600 space-x-2 mb-2">
        <span>{property.beds} Bedrooms</span>
        <span>{property.baths} Bathrooms</span>
      </div>
      <p className="text-xs text-gray-400 mb-2">{property.size}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">{property.price}</span>
        <Button  className="text-white text-xs font-medium">Read more</Button>
      </div>
<ExpandedProperty/>
    </div>
  );
}
