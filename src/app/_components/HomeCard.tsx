import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
function HomeCard() {
  
  return (
    <div className="lg:w-72 w-full rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image section */}
      <div className="relative w-full lg:h-44 h-32">
        <Image
          src="/images/img-2.jpg"
          alt="building"
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
          <Heart className="w-5 h-5 text-red-500" />
        </div>
      </div>

      {/* Details section */}
      <div className="p-4">
        {/* Location and price */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4 " />
            <span className="text-[12px] lg:text-xs">Ecomog, Accra</span>
          </div>
          <span className="bg-yellow-100 text-yellow-800 sm:px-2 py-1 lg:text-xs text-[10px] px-6 rounded-full">
            GH₵ 30K
          </span>
        </div>

        {/* Property Features */}
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" /> 3
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> 2
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" /> 120m²
          </div>
        </div>

        {/* 📝 House Description */}
        <p className="text-xs text-gray-600 mb-4">
          A modern 3-bedroom house with spacious living, stylish kitchen, and large backyard. Located in a peaceful neighborhood, perfect for families.
        </p>

        {/* CTA Button */}
        <button className="w-full text-center bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition">
          View Details
        </button>
      </div>
    </div>

  );
}

export default HomeCard;
