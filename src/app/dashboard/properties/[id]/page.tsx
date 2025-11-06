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
import { formatNumber } from "@/lib/utils";
import { ImageCarousel } from "@/components/image-carousel";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { IHouse } from "@/models/House";
import { ScaleLoader } from "react-spinners";

export type roomType = {
  lockStatus: "locked" | "unlocked";
  _id: string;
  houseId: IHouse;
  name: string;
  description: string;
  price: number;
  status: "available" | "booked" | "pending";
  images: string[];
  beds: number;
  baths: number;
  smartLockEnabled: boolean;
  planType: "monthly" | "yearly";
};

function ExpandedProperty() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [room, setRoom] = useState<roomType | null>(null);
  const { user } = useDashStore();
  const { id: roomId } = useParams();

  useEffect(() => {
    const getRoom = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/rooms/${roomId}`);
        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getRoom();
  }, [roomId]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
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

    if (checkData.success && checkData.active) {
      Swal.fire({
        icon: "warning",
        html: `
          <p>You are currently occupying <strong>${checkData.room?.name || "a room"}</strong>.</p>
          <p class="mt-2 text-sm text-gray-600">
            Please contact the administrator or wait until your current subscription expires 
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
        amount: room.price * 100,
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
          } catch {
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

  if (isLoading)
    return (
      <div className="flex justify-center pt-10">
        <ScaleLoader color="#6B7280" />
      </div>
    );

  return (
    <div className="w-full mt-16 sm:mt-6 min-h-screen pb-20 bg-gray-50 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="relative">
        <ImageCarousel images={room?.images ?? []} title={room?.name ?? "Room"} />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition"
        >
          <IoArrowBack size={18} />
          Back
        </button>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{room?.name}</h1>
            <div className="mb-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
              <p className="text-gray-300 text-sm tracking-wide uppercase">
                {room?.planType} Rent
              </p>
              <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">
                GHS {room?.price && formatNumber(room.price)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-lg text-muted-foreground mb-4">
              <FaMapMarkerAlt className="w-5 h-5" />
              <span>{room?.houseId?.location.city}, {room?.houseId?.location.address}</span>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground">{room?.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            onClick={() => setOpen(true)}
            className="bg-black text-white w-full sm:w-auto px-8 py-4 rounded-lg hover:bg-gray-700 font-bold text-lg transition"
          >
            Book Now
          </button>
        </div>

        {/* Right Column - Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
          {room?.images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal + Toast */}
      <TenancyTermsModal handlePay={handlePay} open={open} setOpen={setOpen} />
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
    </div>
  );
}

export default ExpandedProperty;
