// src/app/renewal/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import {
  FaChartLine,
  FaCrown,
  FaHandshake,
  FaLock,
  FaMapMarkerAlt,
  FaDoorOpen,
  FaBath,
  FaClipboardList,
} from "react-icons/fa";
import { LuClipboardList, LuHeadphones, LuSettings2 } from "react-icons/lu";
import { IoBedOutline, IoLocationOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";

type DummyUser = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
};

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

export default function RenewalPageTenant() {
  const router = useRouter();

  const [user] = useState<DummyUser>({
    _id: "tenant_001",
    name: "Kofi Mensah",
    email: "kofi@example.com",
    avatar: "/images/user-default.png",
    role: "buyer",
  });

  const [room, setRoom] = useState<RoomInfo | null>(null);
  const [renewing, setRenewing] = useState(false);
  const [status, setStatus] = useState({
    shouldRenew: true,
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // simulate fetching user's active room payment
  useEffect(() => {
    async function fetchRoom() {
      // 🔹 in a real app, call /api/payments/active?userId=...
      // and populate room details.
      const fakeRoom: RoomInfo = {
        _id: "room_101",
        name: "Deluxe Apartment - Tamale",
        price: 850,
        status: "booked",
        beds: 2,
        baths: 1,
        smartLockEnabled: true,
        lockStatus: "unlocked",
        planType: "monthly",
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
      };
      setRoom(fakeRoom);
    }
    fetchRoom();
  }, []);

  const daysLeft = useMemo(() => {
    if (!status.expiresAt) return undefined;
    return Math.max(
      0,
      differenceInCalendarDays(new Date(status.expiresAt), new Date())
    );
  }, [status.expiresAt]);

  const handleRenew = (plan?: "monthly" | "yearly") => {
    setRenewing(true);
    setTimeout(() => {
      setRenewing(false);
      alert(`(Stub) Would redirect to checkout for plan: ${plan ?? "monthly"}`);
    }, 700);
  };

  const bannerTitle = status.shouldRenew
    ? "Subscription expiring soon"
    : "Subscription status";
  const bannerSubtitle = status.expiresAt
    ? `Expires on ${format(new Date(status.expiresAt), "PPP")}`
    : "No active subscription found";

  const perks = [
    {
      title: "Uninterrupted Bookings",
      subtitle:
        "Keep upcoming bookings and reservations active, no risk of auto cancel.",
      points: "Priority",
      icon: <FaCrown className="w-6 h-6" />,
    },
    {
      title: "Smart Lock Access",
      subtitle: "Maintain remote access to smart-lock enabled rooms.",
      points: "Access",
      icon: <FaLock className="w-6 h-6" />,
    },
    {
      title: "Priority Rebooking",
      subtitle: "Faster rebooking of favorite rooms with priority windows.",
      points: "Convenience",
      icon: <FaChartLine className="w-6 h-6" />,
    },
    {
      title: "Dedicated Support",
      subtitle: "Priority email and chat assistance for subscribers.",
      points: "Support",
      icon: <LuHeadphones className="w-6 h-6" />,
    },
    {
      title: "Partner Discounts",
      subtitle: "Exclusive discounts on cleaning and maintenance services.",
      points: "Savings",
      icon: <FaHandshake className="w-6 h-6" />,
    },
    {
      title: "Flexible Plans",
      subtitle: "Switch between monthly and yearly renewals with ease.",
      points: "Flexibility",
      icon: <LuSettings2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <img src={user.avatar ?? "/images/user-default.png"} alt={user.name} />
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">Subscription Renewal</h1>
            <p className="text-sm text-muted-foreground">
              Hello, <span className="font-medium">{user.name}</span>
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

      {/* Room Information Section */}
      {room && (
    <Card className="mb-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
  <CardContent className="flex flex-col sm:flex-row ">
    {/* Image Section */}
    <div className="sm:w-1/3 relative">
      <img
        src={
          room.images?.[0] ??
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        }
        alt={room.name}
        className="w-full h-48 sm:h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      {room.smartLockEnabled && (
        <Badge
          className="absolute top-3 left-3 bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm"
          variant="outline"
        >
          Smart Lock: {room.lockStatus}
        </Badge>
      )}
    </div>

    {/* Content Section */}
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold tracking-tight text-gray-900">
          {room.name}
        </h3>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <IoLocationOutline className="w-4 h-4 text-gray-500" /> Tamale, Ghana
          </span>
          <span className="flex items-center gap-1">
            <IoBedOutline className="w-4 h-4 text-gray-500" /> {room.beds} beds
          </span>
         
        </div>
       <div className="flex flex-wrap gap-3 text-sm text-gray-600">
  <span className="flex items-center gap-1">
   <PiBathtubLight  className="w-4 h-4 text-gray-500" /> {room.baths} bath(s)
  </span>

  <span className="flex items-center gap-1">
    <LuClipboardList className="w-4 h-4 text-gray-500" />
    <strong className="text-gray-700">Plan:</strong> {room.planType}
  </span>
</div>

      </div>

      <div className="flex items-center justify-between pt-4 border-t mt-4">
        <p className="font-semibold text-lg text-gray-900">
          ₵{room.price.toLocaleString()}{" "}
          <span className="text-gray-500 font-normal text-sm">
            / {room.planType}
          </span>
        </p>
        <Badge
          variant={room.status === "booked" ? "default" : "secondary"}
          className="capitalize px-3 py-1 text-sm"
        >
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
        className={`rounded-lg p-6 mb-6 shadow-sm ${
          status.shouldRenew ? "bg-rose-50" : "bg-slate-50"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <h2 id="subscription-banner" className="text-xl font-semibold text-gray-900">
              {bannerTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{bannerSubtitle}</p>

            {status.shouldRenew && (
              <div className="mt-4 flex items-start gap-3 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-md p-3 max-w-2xl">
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
          </div>

          {/* Right side actions */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="text-right">
              {status.expiresAt && (
                <p className="text-sm text-muted-foreground">
                  Expiry:{" "}
                  <span className="font-medium">
                    {format(new Date(status.expiresAt), "PPP")}
                  </span>
                </p>
              )}
              <p className="text-lg font-semibold">
                {daysLeft ?? "--"}{" "}
                <span className="text-sm font-normal text-muted-foreground">day(s) left</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleRenew("monthly")}
                disabled={renewing || !status.shouldRenew}
              >
                Renew Monthly
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleRenew("yearly")}
                disabled={renewing || !status.shouldRenew}
              >
                Renew Yearly
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Renew Section */}
      <section className="text-center mt-12">
        <h3 className="text-2xl font-semibold mb-2">Why renew? Benefits for tenants</h3>
        <p className="text-sm text-muted-foreground mb-8">
          Retain access, conveniences and exclusive benefits.
        </p>

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
