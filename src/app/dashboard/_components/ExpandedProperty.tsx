'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { startPaystackPayment } from '@/lib/paystackConfig';
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
  const { toggleExpandedProperty } = useDashStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

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
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center overflow-y-auto z-50 px-4 sm:px-6 py-6">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={toggleExpandedProperty}
          className="absolute top-4 right-4 z-10 p-1.5 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <IoClose className="size-6 text-gray-800" />
        </button>

        {/* Image Slider */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
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
            className="absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
          >
            ›
          </button>

          {/* Image Indicator Dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                  i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="px-5 sm:px-8 py-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Modern 2-Bedroom Apartment
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold text-black">Location:</span>{' '}
            Achimota Gardens, Accra
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-black">Price:</span> GHS {price}/month
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            2-bedroom apartment with a spacious living area, modern kitchen,
            tiled floors, and balcony views. Close to major transport routes and
            amenities.
          </p>
          <button
            onClick={handlePay}
            className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 font-semibold transition"
          >
            Rent Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ExpandedProperty;
