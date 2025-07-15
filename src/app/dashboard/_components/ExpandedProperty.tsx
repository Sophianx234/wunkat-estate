import Image from "next/image";
import { IoClose } from "react-icons/io5";

function ExpandedProperty() {
  return (
    <div className="shadow border z-10 mb-16 bg-white absolute inset-x-0 h-fit top-0">
      <div className="relative">
        <IoClose className="absolute right-3 top-2 size-8 cursor-pointer" />

        {/* Property Images */}
        <div className="flex justify-center pt-6 gap-4 ">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="relative h-96 w-1/5">
              <Image
                src="/images/img-1.jpg"
                fill
                alt="Apartment"
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>

        {/* Property Details */}
        <div className="mt-8 px-16 max-w-3xl mb-8">
          <h2 className="text-2xl font-semibold mb-2 font-inter">Modern 2-Bedroom Apartment</h2>
          
          <p className="text-gray-600 mb-1">
            <span className="font-medium text-black">Location:</span> Achimota Gardens, Accra
          </p>
          
          <p className="text-gray-600 mb-1">
            <span className="font-medium text-black">Price:</span> GHS 1,500/month
          </p>

          {/* Description */}
          <p className="text-gray-700 mt-4 font-karla">
            2-bedroom apartment with a spacious living area, modern kitchen, tiled floors,
            and balcony views. Located at Achimota Gardens, this home offers convenience and comfort
            just minutes from key city spots.
          </p>

          {/* Rent Button */}
          <button className="mt-6 px-6 py-2 bg-black text-white font-semibold  hover:bg-gray-900 rounded-lg transition">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpandedProperty;
