"use client";

import { startPaystackPayment } from "@/lib/paystackConfig";
import { useDashStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import TenancyTermsModal from "../../_components/TermsAgreement";

/* type ExpandedPropertyProps = {
  price?: string;
};
 */
/* const images = [
  '/images/img-1.jpg',
  '/images/img-2.jpg',
  '/images/img-5.jpg',
  '/images/img-4.jpg',
]; */

export type roomType = {
  lockStatus: "locked" | "unlocked"; // adjust if there are other possible values
  _id: string;
  houseId: string;
  name: string;
  description: string;
  price: number;
  status:"available" | "booked" | "pending";
  images: string[];
  beds: number;
  baths: number;
  smartLockEnabled: boolean;
  planType: "monthly" | "yearly";
};

function ExpandedProperty() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [room, setRoom] = useState<roomType | null>(null);
  const { user } = useDashStore();
  
  const { id: roomId } = useParams();
  useEffect(() => {
    try {
      const getRoom = async () => {
        setIsLoading(true);

        const res = await fetch(`/api/rooms/${roomId}`);
        if (res.ok) {
          const data = await res.json();
          console.log("datata:", data);
          setRoom(data);
        }
      };
      getRoom();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log("xx123: ", roomId, user?._id, user?.email);

  const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const handlePay = async () => {
  if (!user || !room) {
    Toast.fire({
      icon: "error",
      title: "User or room info missing",
    });
    return;
  }

  startPaystackPayment(
    {
      email: user.email,
      amount: room.price * 100, // convert GHS to kobo
      currency: "GHS",
    },
    async (response) => {
      if (response.status === "success") {
        Toast.fire({
          icon: "success",
          title: "Payment successful! Verifying...",
        });

        try {
          const res = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: response.reference,
              userId: user._id,
              roomId: room._id,
              amount: room.price,
              duration: room.planType === "monthly" ? 1 : 12,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            Toast.fire({
              icon: "success",
              title: "Payment verified and room booked!",
            });
            setOpen(false);
          } else {
            Toast.fire({
              icon: "error",
              title: data.error || "Verification failed",
            });
          }
        } catch (err) {
          console.error(err);
          Toast.fire({
            icon: "error",
            title: "Error verifying payment",
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: "Payment cancelled or failed",
        });
      }
    }
  );
};







  if (isLoading) return <>loading</>;
  const nextImage = () =>
    setIndex((prev) => (prev + 1) % (room as roomType)?.images.length);
  const prevImage = () =>
    setIndex(
      (prev) =>
        (prev - 1 + (room as roomType).images.length) %
        (room as roomType).images.length
    );

  return (
    <div className="w-full mt-16 sm:mt-0 min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="relative w-full scrollbar-hide overflow-x-hidden lg:ml-8 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 scrollbar-hide w-full h-full"
          >
            <Image
              src={room?.images[index] || "/images/img-placeholder.jpg"}
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
          {(room as roomType)?.images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
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
            <p className="text-gray-300 text-sm tracking-wide uppercase">
              {room?.planType} Rent
            </p>
            <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
              GHS {room?.price}
            </p>
          </div>

          <p className="text-gray-600 mb-4">
            <span className="font-semibold text-black">Location:</span> Achimota
            Gardens, Accra
          </p>

          <p className="text-gray-700 mb-8 leading-relaxed">
            {room?.description}
          </p>

          <button
            onClick={()=>setOpen(true)}
            className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-700 font-bold text-lg transition w-full sm:w-auto"
          >
            Book Now
          </button>
        </div>

        {/* Extra images (Gallery Grid) */}
        <div className="grid grid-cols-2 gap-4">
          {room?.images.map((img, i) => (
            <div
              key={i}
              className="relative h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden shadow"
            >
              <Image
                src={img}
                alt={`Gallery ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <TenancyTermsModal handlePay={handlePay} open={open} setOpen={setOpen} />
      <ToastContainer
  position="top-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"   // makes success/error have notifier-style colors
/>


    </div>
  );
}

export default ExpandedProperty;
