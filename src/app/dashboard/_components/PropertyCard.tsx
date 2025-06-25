import Image from "next/image";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Image
        src={property.image}
        alt={property.name}
        width={400}
        height={250}
        className="rounded-lg mb-4"
      />
      <h3 className="font-semibold text-sm mb-1">{property.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{property.location}</p>
      <div className="text-xs text-gray-600 space-x-2 mb-2">
        <span>{property.beds} Bedrooms</span>
        <span>{property.baths} Bathrooms</span>
      </div>
      <p className="text-xs text-gray-400 mb-2">{property.size}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">{property.price}</span>
        <a href="#" className="text-purple-600 text-xs font-medium">Read more</a>
      </div>
    </div>
  );
}
