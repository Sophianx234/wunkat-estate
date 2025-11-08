"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Swal from "sweetalert2";
import { formatNumber } from "@/lib/utils"; // optional if you want nice number formatting

import { ShieldAlert } from "lucide-react";
import {
  FaChartLine,
  FaCrown,
  FaHandshake,
  FaLock,
} from "react-icons/fa";
import { IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { LuClipboardList, LuHeadphones, LuSettings2 } from "react-icons/lu";
import { useDashStore } from "@/lib/store";
import { startPaystackPayment } from "@/lib/paystackConfig";
import { ScaleLoader } from "react-spinners";

type RoomInfo = {
  _id: string;
  name: string;
  price: number;
  status: "available" | "booked" | "pending";
  beds: number;
  baths: number;
  smartLockEnabled: boolean;
  lockStatus: "locked" | "unlocked";
  planType: "monthly" | "yearly";
  images?: string[];
};

type HouseInfo = {
  _id: string;
  name: string;
  location: {
    address: string;
    city: string;
    region: string;
    country: string;
  };
  amenities?: string[];
  smartLockSupport?: boolean;
};

type PaymentInfo = {
  _id: string;
  expiresAt: string;
  amount: number;
  reference: string;
  createdAt: string;
};

export default function RenewalPageTenant() {
  const router = useRouter();
  const { user } = useDashStore();

  const [room, setRoom] = useState<RoomInfo | null>(null);
  const [house, setHouse] = useState<HouseInfo | null>(null);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [status, setStatus] = useState({ shouldRenew: false, expiresAt: "" });
  const [renewType, setRenewType] = useState<"monthly" | "yearly">("monthly");

  const [renewing, setRenewing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user's renewal data
  useEffect(() => {
    async function fetchRenewalData() {
      try {
        const res = await fetch(`/api/dashboard/renewal?userId=${user?._id}`);
        const data = await res.json();

        if (res.ok && data.payment) {
          console.log("Renewal data:", data);
          setRoom(data.room);
          setHouse(data.house);
          setPayment(data.payment);
          setStatus({
            shouldRenew: data.expired ?? false,
            expiresAt: data.payment.expiresAt,
          });
        } else {
          setRoom(null);
          setHouse(null);
          setPayment(null);
          setStatus({ shouldRenew: true, expiresAt: "" });
        }
      } catch (error) {
        console.error("❌ Error loading renewal data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user?._id) fetchRenewalData();
  }, [user?._id]);

  const daysLeft = useMemo(() => {
    if (!status.expiresAt) return undefined;
    return Math.max(
      0,
      differenceInCalendarDays(new Date(status.expiresAt), new Date())
    );
  }, [status.expiresAt]);



const handleRenew = async (plan: "monthly" | "yearly") => {
  if (!user || !room) {
    Swal.fire({
      icon: "error",
      title: "Missing Info",
      text: "User or room information is missing.",
      confirmButtonColor: "#000",
    });
    return;
  }

  // Calculate renewal amount
  const renewalAmount =
    plan === "yearly" ? room.price * 12 : room.price;

  // 🧾 Step 1 — Ask for confirmation
  const result = await Swal.fire({
    title: `Renew ${plan === "yearly" ? "Yearly" : "Monthly"} Plan?`,
    html: `
      <p class="text-gray-700">
        You’re about to renew your <strong>${plan}</strong> plan.
      </p>
      <p class="mt-2 text-lg font-semibold text-gray-900">
        ₵${formatNumber(renewalAmount)}
      </p>
      <p class="text-sm text-gray-500 mt-1">Do you want to continue?</p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Renew",
    cancelButtonText: "Cancel",
    backdrop: `rgba(0,0,0,0.4)`,
  });

  if (!result.isConfirmed) return;

  setRenewType(plan);
  setRenewing(true);

  try {
    // 🧩 Step 2 — Start Paystack payment
    startPaystackPayment(
      {
        email: user.email,
        amount: renewalAmount * 100, // convert GHS to kobo
        currency: "GHS",
      },
      async (response) => {
        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Payment successful!",
            text: "Verifying your renewal...",
            timer: 1500,
            showConfirmButton: false,
          });

          try {
            const res = await fetch("/api/payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: response.reference,
                userId: user._id,
                roomId: room._id,
                amount: renewalAmount,
                duration: plan === "monthly" ? 1 : 12,
                renewal: true, // flag for backend if needed
              }),
            });

            const data = await res.json();

            if (res.ok) {
              Swal.fire({
                icon: "success",
                title: "Subscription Renewed!",
                text: "Your access has been restored successfully.",
                confirmButtonColor: "#000",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: data.error || "Could not verify payment.",
              });
            }
          } catch (err) {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Network Error",
              text: "Error verifying payment. Please try again.",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment Cancelled",
            text: "You cancelled the renewal process.",
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong starting your renewal.",
    });
  } finally {
    setRenewing(false);
  }
};


  const bannerTitle = status.shouldRenew
    ? "Subscription expired"
    : "Subscription active";

  const bannerSubtitle = status.expiresAt
    ? `Expires on ${format(new Date(status.expiresAt), "PPP")}`
    : "No active subscription found";

const perks = [
  {
    title: "Seamless Renewals",
    subtitle: "Easily renew your room before it expires. no stress, no delays.",
    points: "Convenience",
    icon: <FaCrown className="w-6 h-6" />,
  },
  {
    title: "Smart Access",
    subtitle: "Enjoy secure keyless entry to select rooms using our smart-lock system.",
    points: "Access",
    icon: <FaLock className="w-6 h-6" />,
  },
  {
    title: "Early Rebooking",
    subtitle: "Rebook your favorite rooms before they’re made available to others.",
    points: "Priority",
    icon: <FaChartLine className="w-6 h-6" />,
  },
  {
    title: "Dedicated Assistance",
    subtitle: "Reach out anytime our support team is here to help you quickly and reliably.",
    points: "Support",
    icon: <LuHeadphones className="w-6 h-6" />,
  },
  {
    title: "Exclusive Offers",
    subtitle: "Enjoy periodic discounts and special pricing for loyal WunkatHomes users.",
    points: "Savings",
    icon: <FaHandshake className="w-6 h-6" />,
  },
  {
    title: "Flexible Stay Plans",
    subtitle: "Choose between monthly, quarterly, or yearly room renewals that fit your lifestyle.",
    points: "Flexibility",
    icon: <LuSettings2 className="w-6 h-6" />,
  },
];


  if (loading) {
    return (
    
      <div className="flex justify-center items-center h-[50vh]">
                <ScaleLoader color="#868e96" />
              </div>
    );
  }

  return (
    <div className="p-6 pt-10 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <img src={user?.profile ?? "/images/user-default.png"} alt={user?.name} />
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">Subscription Renewal</h1>
            <p className="text-sm text-muted-foreground">
              Hello, <span className="font-medium">{user?.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant={status.shouldRenew ? "destructive" : "secondary"}>
            {daysLeft !== undefined
              ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining`
              : "No active plan"}
          </Badge>

          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Room & House Information */}
      {room && house && (
        <Card className="mb-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
          <CardContent className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-1/3 relative">
              <img
                src={room.images?.[0] ?? "/images/default-room.jpg"}
                alt={room.name}
                className="w-full h-48 sm:h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {room.smartLockEnabled && (
                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm" variant="outline">
                  Smart Lock: {room.lockStatus}
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold tracking-tight text-gray-900">{room.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {house.name} • {house.location.city}, {house.location.country}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <IoLocationOutline className="w-4 h-4 text-gray-500" /> {house.location.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoBedOutline className="w-4 h-4 text-gray-500" /> {room.beds} beds
                  </span>
                  <span className="flex items-center gap-1">
                    <PiBathtubLight className="w-4 h-4 text-gray-500" /> {room.baths} bath(s)
                  </span>
                  <span className="flex items-center gap-1">
                    <LuClipboardList className="w-4 h-4 text-gray-500" /> Plan: {room.planType}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t mt-4">
                <p className="font-semibold text-lg text-gray-900">
                  ₵{room.price.toLocaleString()}{" "}
                  <span className="text-gray-500 font-normal text-sm">/ {room.planType}</span>
                </p>
                <Badge variant={room.status === "booked" ? "default" : "secondary"} className="capitalize px-3 py-1 text-sm">
                  {room.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Banner */}
    <section
  aria-labelledby="subscription-banner"
  className={`relative overflow-hidden rounded-xl border shadow-sm mb-8 transition-all ${
    status.shouldRenew
      ? "bg-gradient-to-r from-rose-50 via-white to-rose-50 border-rose-200"
      : "bg-gradient-to-r from-green-50 via-white to-green-50 border-green-200"
  }`}
>
  {/* Banner Header */}
  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
    <div>
      <h2
        id="subscription-banner"
        className="text-xl sm:text-2xl font-semibold text-gray-900"
      >
        {bannerTitle}
      </h2>
      <p className="text-sm text-gray-500 mt-1">{bannerSubtitle}</p>
    </div>

    {payment && (
      <div className="text-sm text-gray-600 text-right">
        <p>
          Expiry:{" "}
          <span className="font-medium text-gray-900">
            {format(new Date(payment.expiresAt), "PPP")}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          {daysLeft ?? "--"} day(s) left
        </p>
      </div>
    )}
  </div>

  {/* Main Content */}
  <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
    {/* Left: Renewal Notice */}
    <div className="flex-1 space-y-3">
      {status.shouldRenew && (
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 shadow-inner">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-700" />
           <div>
                  <p>
                    To maintain uninterrupted access, please renew your subscription prior to expiry.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <strong>Important:</strong> Smart-lock access will be automatically restricted after expiry.
                  </p>
                </div>
        </div>
      )}

     

    {/* Right: Action Buttons */}
    <div className="flex items-center justify-between">

    <div className="flex flex-col sm:items-end items-center gap-3">
       {room && (
        <div className="pt-1">
          <p className="text-gray-700">
            Plan:{" "}
            <span className="font-semibold text-gray-900">
              {room.planType}
            </span>
          </p>
          <p className="mt-1 text-base font-semibold text-gray-900">
            ₵
            {renewType === "yearly"
              ? (room.price * 12).toLocaleString()
              : room.price.toLocaleString()}{" "}
            <span className="text-sm font-normal text-gray-500">
              / {renewType === "yearly" ? "year" : room.planType}
            </span>
          </p>
        </div>
      )}
    </div>
      <div className="flex  gap-2">
        <Button
          onClick={() => handleRenew("monthly")}
          disabled={renewing}
          className={`rounded-full px-5 ${
            renewType === "monthly"
            ? "bg-black text-white shadow"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Renew Monthly
        </Button>

        <Button
          onClick={() => handleRenew("yearly")}
          disabled={renewing}
          className={`rounded-full px-5 ${
            renewType === "yearly"
              ? "bg-black text-white shadow"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Renew Yearly
        </Button>
      </div>
    </div>
  </div>
  </div>

  {/* Decorative Accent */}
  <div
    className={`absolute top-0 left-0 h-1 w-full ${
      status.shouldRenew ? "bg-rose-400" : "bg-green-400"
    } rounded-t-xl`}
  />
</section>



      {/* Why Renew Section */}
      <section className="text-center mt-12">
        <h3 className="text-2xl font-semibold mb-2">Why renew? Benefits for tenants</h3>
        <p className="text-sm text-muted-foreground mb-8">Retain access, convenience, and exclusive benefits.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {perks.map((card, i) => (
            <article key={i} className="h-full rounded-xl p-6 flex flex-col items-center text-center justify-between">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4 text-black">
                {card.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">{card.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{card.subtitle}</p>
              </div>
              <span className="font-medium text-sm mt-4">{card.points}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
