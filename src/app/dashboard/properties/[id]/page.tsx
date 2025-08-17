'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { startPaystackPayment } from '@/lib/paystackConfig';
import toast, { Toaster } from "react-hot-toast";
import { useDashStore } from '@/lib/store';

type ExpandedPropertyProps = {
  price?: string;
};

const images = [
  '/images/img-1.jpg',
  '/images/img-2.jpg',
  '/images/img-5.jpg',
  '/images/img-4.jpg',
];

function ExpandedProperty({ price = '1,500' }: ExpandedPropertyProps) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { user } = useDashStore();
  const { id: roomId } = useParams();

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(price.replace(/,/g, ''));

    await startPaystackPayment({
      email: 'customer@example.com',
      amount,
      onSuccess: async (res) => {
        try {
          const response = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: res.reference,
              userId: user?.id,
              roomId: roomId,
              amount,
              duration: 1,
            }),
          });

          if (!response.ok) throw new Error("Verification failed");

          toast.success("✅ Payment verified & saved!");
        } catch (err) {
          console.error(err);
          toast.error("❌ Error verifying payment");
        }
      },
      onClose: () => {
        toast("⚠️ Transaction was closed", { icon: "⚠️" });
      }
    });
  };

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full mt-16 sm:mt-0 min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="relative w-full lg:ml-8 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[index]}
              alt={`Slide ${index}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm sm:text-base transition"
        >
          <IoArrowBack size={20} />
          Back
        </button>

        {/* Arrows */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        {/* Details */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Modern 2-Bedroom Apartment
          </h1>

          {/* Highlighted Price */}
{/* Highlighted Price */}
<div className="mb-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
  <p className="text-gray-300 text-sm tracking-wide uppercase">Monthly Rent</p>
  <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
    GHS {price}
  </p>
</div>



          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-black">Location:</span>{' '}
            Achimota Gardens, Accra
          </p>

          <p className="text-gray-700 mb-8 leading-relaxed">
            This spacious 2-bedroom apartment boasts an elegant modern design,
            featuring a bright living room, fully equipped kitchen,
            stylish tiled floors, and a private balcony with breathtaking views.
            Located in the serene Achimota Gardens, it’s close to transport routes,
            shops, and schools.
          </p>

          <button
            onClick={handlePay}
            className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-700 font-bold text-lg transition w-full sm:w-auto"
          >
            Rent Now
          </button>
        </div>

        {/* Extra images (Gallery Grid) */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden shadow">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default ExpandedProperty;
