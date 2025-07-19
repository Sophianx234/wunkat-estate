'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { startPaystackPayment } from '@/lib/paystackConfig';
import { useAppStore } from '@/lib/store';

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
  const { toggleExpandedProperty } = useAppStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Re-enable click-outside-to-close safely
  useEffect(() => {
    

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleExpandedProperty();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleExpandedProperty]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(price.replace(/,/g, ''));
    await startPaystackPayment({
      email: 'customer@example.com',
      amount,
      onSuccess: (res) => {
        alert(`Payment successful! Reference: ${res.reference}`);
      },
      onClose: () => alert('Transaction was closed'),
    });
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-[#000000a7] flex justify-center items-center overflow-y-scroll h-dvh">
      <div className="translate-x-32 translate-y-32">
        <div
          ref={modalRef}
          className="relative max-w-2xl mx-10 w-full rounded-xl shadow-lg mb-4 mt-32 bg-white"
        >
          {/* Close Button */}
          <IoClose
            onClick={toggleExpandedProperty}
            className="absolute top-4 right-4 size-8 text-gray-800 hover:text-black cursor-pointer z-10"
          />

          {/* Image Slider */}
          <div className="relative h-[350px] md:h-[450px] bg-black overflow-hidden">
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
                  fill
                  alt={`Slide ${index}`}
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black"
            >
              ›
            </button>
          </div>

          {/* Details */}
          <div className="px-6 py-6 md:px-12 md:py-8">
            <h2 className="text-2xl md:text-3xl font-bold font-inter mb-2">
              Modern 2-Bedroom Apartment
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold text-black">Location:</span>{' '}
              Achimota Gardens, Accra
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold text-black">Price:</span> GHS {price}/month
            </p>
            <p className="text-gray-700 font-karla mb-6">
              2-bedroom apartment with a spacious living area, modern kitchen,
              tiled floors, and balcony views.
            </p>

            <button
              onClick={handlePay}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 font-semibold"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedProperty;
