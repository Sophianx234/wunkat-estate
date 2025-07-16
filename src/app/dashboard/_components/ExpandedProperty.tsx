'use client';

import Image from "next/image";
import { FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import { startPaystackPayment } from "@/lib/paystackConfig";
import { useAppStore } from "@/lib/store";

type ExpandedPropertyProps = {
  price?: string; // e.g., "1,500"
};

function ExpandedProperty({ price = "1,500" }: ExpandedPropertyProps) {
  const {toggleExpandedProperty} = useAppStore()
  const handlePay = async (e: FormEvent) => {
    e.preventDefault();

    const amount = Number(price.replace(/,/g, ""));

    await startPaystackPayment({
      email: "customer@example.com", // Replace or pass dynamically
      amount,
      onSuccess: (response) => {
        console.log("Payment successful:", response);
        alert(`Payment successful! Reference: ${response.reference}`);
        // Optionally redirect or verify here
      },
      onClose: () => {
        console.log("Payment popup closed");
        alert("Transaction was closed");
      },
    });
  };

  return (
    <div className="   mb-16  absolute inset-x-0 h-fit top-0">
      <div className="relative bg-white mb-4  mx-6 shadow border z-10">
        <IoClose onClick={toggleExpandedProperty} className="absolute right-3 top-2 size-8 cursor-pointer" />
        <div className="flex justify-center pt-6 gap-4">
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

        <div className="mt-8 px-16 max-w-3xl mb-8">
          <h2 className="text-2xl font-semibold mb-2 font-inter">
            Modern 2-Bedroom Apartment
          </h2>

          <p className="text-gray-600 mb-1">
            <span className="font-medium text-black">Location:</span> Achimota Gardens, Accra
          </p>

          <p className="text-gray-600 mb-1">
            <span className="font-medium text-black">Price:</span> GHS {price}/month
          </p>

          <p className="text-gray-700 mt-4 font-karla">
            2-bedroom apartment with a spacious living area, modern kitchen, tiled floors,
            and balcony views.
          </p>

          <button
            onClick={handlePay}
            className="mt-6 px-6 py-2 bg-black text-white font-semibold hover:bg-gray-900 rounded-lg transition"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpandedProperty;
