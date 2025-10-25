// src/app/renewal/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";
import { FaChartLine, FaCrown, FaHandshake, FaLock } from "react-icons/fa";
import { LuHeadphones, LuSettings2 } from "react-icons/lu";

type DummyUser = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
};

export default function RenewalPageTenant() {
  const router = useRouter();

  // ----- Dummy user + subscription data -----
  const [user] = useState<DummyUser>({
    _id: "tenant_001",
    name: "Kofi Mensah",
    email: "kofi@example.com",
    avatar: "/images/user-default.png",
    role: "buyer",
  });

  // pretend expires in 2 days (so shouldRenew=true)
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

  const [status] = useState({
    shouldRenew: true,
    expiresAt: twoDaysFromNow.toISOString(),
  });

  const [renewing, setRenewing] = useState(false);

  // compute days left
  const daysLeft = useMemo(() => {
    if (!status.expiresAt) return undefined;
    return Math.max(0, differenceInCalendarDays(new Date(status.expiresAt), new Date()));
  }, [status.expiresAt]);

  // perks tailored for tenants
  const perks = [
    {
      title: "Uninterrupted Bookings",
      subtitle: "Keep upcoming bookings and reservations active, no risk of auto cancel.",
      points: "Priority",
      icon: <FaCrown className=" w-6 h-6" />,
    },
    {
      title: "Smart Lock Access",
      subtitle: "Maintain remote access to smart-lock enabled rooms.",
      points: "Access",
      icon: <FaLock className=" w-6 h-6" />,
    },
    {
      title: "Priority Rebooking",
      subtitle: "Faster rebooking of favorite rooms with priority windows.",
      points: "Convenience",
      icon: <FaChartLine className=" w-6 h-6" />,
    },
    {
      title: "Dedicated Support",
      subtitle: "Priority email and chat assistance for subscribers.",
      points: "Support",
      icon: <LuHeadphones className=" w-6 h-6" />,
    },
    {
      title: "Partner Discounts",
      subtitle: "Exclusive discounts on cleaning and maintenance services.",
      points: "Savings",
      icon: <FaHandshake className=" w-6 h-6" />,
    },
    {
      title: "Flexible Plans",
      subtitle: "Switch between monthly and yearly renewals with ease.",
      points: "Flexibility",
      icon: <LuSettings2 className=" w-6 h-6" />,
    },
  ];

  // renewal stub — hook up to checkout/payment in real app
  const handleRenew = (plan?: "monthly" | "yearly") => {
    setRenewing(true);
    setTimeout(() => {
      setRenewing(false);
      // replace with router.push("/checkout?plan=monthly") or call to create payment
      alert(`(Stub) Would redirect to checkout for plan: ${plan ?? "monthly"}`);
    }, 700);
  };

  // helpers for banner text
  const bannerTitle = status.shouldRenew ? "Subscription expiring soon" : "Subscription status";
  const bannerSubtitle = status.expiresAt
    ? `Expires on ${format(new Date(status.expiresAt), "PPP")}`
    : "No active subscription found";

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
            {daysLeft !== undefined ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining` : "No active plan"}
          </Badge>

          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Subscription Banner (single, formal, non-repetitive) */}
      <section
        aria-labelledby="subscription-banner"
        className={`rounded-lg p-6 mb-6 shadow-sm ${status.shouldRenew ? "bg-rose-50" : "bg-slate-50"}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: title + subtitle + formal notice */}
          <div className="min-w-0">
            <h2 id="subscription-banner" className="text-xl font-semibold text-gray-900">
              {bannerTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{bannerSubtitle}</p>

            {status.shouldRenew && (
              <div className="mt-4 flex items-start gap-3 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-md p-3 max-w-2xl">
                <ShieldAlert className="w-5 h-5 shrink-0 text-amber-700" />
                <div>
                  <p className="leading-tight">
                    To maintain uninterrupted access, please renew your subscription prior to expiry.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <strong>Important:</strong> Smart-lock access will be automatically restricted after expiry,
                    which may prevent entry to properties with smart locks.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="text-right">
              {status.expiresAt && (
                <p className="text-sm text-muted-foreground">
                  Expiry: <span className="font-medium">{format(new Date(status.expiresAt), "PPP")}</span>
                </p>
              )}
              <p className="text-lg font-semibold">
                {daysLeft ?? "--"} <span className="text-sm font-normal text-muted-foreground">day(s) left</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleRenew("monthly")} disabled={renewing || !status.shouldRenew}>
                Renew Monthly
              </Button>
              <Button variant="secondary" onClick={() => handleRenew("yearly")} disabled={renewing || !status.shouldRenew}>
                Renew Yearly
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why renew — tenant-focused, clean grid like the image */}
      <section className="text-center mt-12">
        <h3 className="text-2xl font-semibold mb-2 ">Why renew? Benefits for tenants</h3>
        <p className="text-sm text-muted-foreground mb-8">Retain access, conveniences and exclusive benefits.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
           {perks.map((card, i) => (
    <article
      key={i}
      className="h-full rounded-xl p-6 flex flex-col items-center text-center justify-between "
    >
      {/* icon stays centered */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4 text-black">
        {card.icon}
      </div>

      {/* content - flex-1 makes this area grow so cards align */}
      <div className="flex-1">
        <h4 className="font-semibold text-lg mb-1">{card.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{card.subtitle}</p>
      </div>

      {/* footer (points) stays at bottom because of justify-between */}
      <span className="font-medium text-sm mt-4">{card.points}</span>
    </article>
  ))}
        </div>

        {/* Milestones */}
        <div className="mt-10">
          <p className="text-[#007f7f] font-semibold mb-2">Super Renewal Milestones</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-700 mb-6">
            <div className="text-center">
              <p className="font-semibold">₵10</p>
              <p>100 points</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">₵50</p>
              <p>500 points</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">₵100</p>
              <p>1,000 points</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">₵200</p>
              <p>2,000 points</p>
            </div>
          </div>

          <Button className="mt-2 bg-[#000] rounded-full px-8 text-white" onClick={() => handleRenew()}>
            Renew Now
          </Button>
        </div>
      </section>
    </div>
  );
}
