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
import { formatNumber, formatPrice } from "@/lib/utils";
import { ImageCarousel } from "@/components/image-carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaBath, FaBed, FaCheck, FaMapMarkerAlt, FaWifi } from "react-icons/fa";
import { IHouse } from "@/models/House";
import { BookingButton } from "@/components/booking-button";

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
  houseId: IHouse;
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

  
  const checkRes = await fetch("/api/rooms/check-active", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    });

    const checkData = await checkRes.json();
    console.log("Active booking check:", checkData);

    // 🧠 if user is already occupying a room
    if (checkData.success && checkData.active) {
      console.log("User already has an active booking.", checkData);
    Swal.fire({
  icon: "warning",
  html: `
    <p>You are currently occupying <strong>${checkData.room?.name || "a room"}</strong>.</p>
    <p class="mt-2 text-sm text-gray-600">
      Please contact the administrator to end your current stay, or wait until your current subscription expires 
      on <strong>${checkData.room ? new Date(checkData.room.bookedUntil).toLocaleDateString() : "its end date"}</strong>.
    </p>
  `,
  confirmButtonText: "Got it",
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







const nextImage = () =>
  setIndex((prev) => (prev + 1) % (room as roomType)?.images.length);
const prevImage = () =>
  setIndex(
    (prev) =>
      (prev - 1 + (room as roomType).images.length) %
    (room as roomType).images.length
  );
  
  if (isLoading) return <>loading</>;
  return (
    <div className="w-full mt-16 sm:mt-6 min-h-screen pb-20 bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="relative ml-4">
        <ImageCarousel images={room?.images ?? []} title={room?.name ?? "Room"} />


        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm sm:text-base transition"
        >
          <IoArrowBack size={20} />
          Back
        </button>

        {/* Arrows */}
      

       
      </div>
      <div className="grid md:grid-cols-3 gap-8 ml-4 mt-12">
                  {/* Left Column - Details */}
                  <div className="md:col-span-2 space-y-8">
                    {/* Title and Location */}
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">{room?.name}</h1>
                      <div className="mb-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
            <p className="text-gray-300 text-sm tracking-wide uppercase">
              {room?.planType} Rent
            </p>
            <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
              GHS {room?.price && formatNumber(room?.price as number)}
            </p>
          </div>
                      <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                        <FaMapMarkerAlt className="w-5 h-5" />
                        {room?.houseId?.location.city}, {room?.houseId?.location.address}
                      </div>
                      <p className="text-lg text-muted-foreground pl-3">{room?.description}</p>
                    </div>
      
                    {/* Quick Facts */}
                    
      
                    {/* Full Description */}
                   
      
                    {/* Amenities */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {room?.houseId?.amenities?.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-3 p-3 rounded border border-border bg-secondary/20"
                          >
                            <FaCheck className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="font-medium">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
            onClick={()=>setOpen(true)}
            className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-700 font-bold text-lg transition w-full sm:w-auto"
          >
            Book Now
          </button>
      
                    {/* Reviews Section */}
                   
                  </div>
      
                  {/* Right Column - Booking Card */}
 
 <div className="grid grid-cols-2 gap-4">
          {room?.images.map((img, i) => (
            <div
              key={i}
              className="relative  rounded-lg overflow-hidden shadow"
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

      {/* Content Section */}
    
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
