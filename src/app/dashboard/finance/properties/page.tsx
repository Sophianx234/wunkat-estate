"use client";

import { motion } from "framer-motion";
import SubscriptionCard from "@/app/_components/SubscriptionCard";
import { GiBed, GiSpookyHouse } from "react-icons/gi";
import { HomeStatsCard } from "../../_components/HomeStatsCard";
import { Lock, Unlock, Clock, KeyRound } from "lucide-react";
import VacancyRateCard from "../../_components/VacancyRateCard";
import RoomLockStatusTable from "../../_components/RoomLockStatus";
import FinancialStats from "../../_components/FinancialStats";

export default function Overview() {
  // Mock stats — these can later be fetched dynamically from your backend
  const stats = [
    {
      title: "Total Houses",
      value: 128,
      icon: GiSpookyHouse,
      buttonLabel: "View Houses",
      color: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      onClick: () => console.log("View Houses clicked"),
    },
    {
      title: "Total Rooms",
      value: 732,
      icon: GiBed,
      buttonLabel: "View Rooms",
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
      onClick: () => console.log("View Rooms clicked"),
    },
    {
      title: "Smartlock Rooms",
      value: 68,
      icon: Lock,
      buttonLabel: "Manage Locks",
      color: "bg-gradient-to-r from-green-500 to-emerald-400",
      onClick: () => console.log("Manage Locks clicked"),
    },
    {
      title: "Available Rooms",
      value: 260,
      icon: Unlock,
      buttonLabel: "View Available",
      color: "bg-gradient-to-r from-yellow-500 to-orange-400",
      onClick: () => console.log("View Available clicked"),
    },
    {
      title: "Booked Rooms",
      value: 420,
      icon: GiBed,
      buttonLabel: "View Booked",
      color: "bg-gradient-to-r from-rose-500 to-red-400",
      onClick: () => console.log("View Booked clicked"),
    },
    {
      title: "Pending Rooms",
      value: 35,
      icon: Clock,
      buttonLabel: "View Pending",
      color: "bg-gradient-to-r from-amber-400 to-orange-500",
      onClick: () => console.log("View Pending clicked"),
    },
    {
      title: "Manually Locked Rooms",
      value: 17,
      icon: KeyRound,
      buttonLabel: "View Locked",
      color: "bg-gradient-to-r from-slate-500 to-gray-400",
      onClick: () => console.log("View Locked clicked"),
    },
  ];

  return (
    <div className="py-6 space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Property Overview
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A quick look at current property performance and room activity across WunkatHomes.
        </p>
      </motion.div>

      {/* Property Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={index === stats.length - 1 && "col-span-2"}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <HomeStatsCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              buttonLabel={stat.buttonLabel}
              onButtonClick={stat.onClick}
            />
          </motion.div>
        ))}
      <SubscriptionCard />
      </motion.div>
      <FinancialStats/>

      {/* Summary + Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4"
      >

        {/* Summary Section */}
        <div className="p-6 rounded-xl col-span-2 bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-800">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Summary
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            WunkatHomes currently manages {stats[0].value} houses and {stats[1].value} rooms.{" "}
            Out of these, {stats[2].value} are smartlock-enabled for remote control, with{" "}
            {stats[3].value} rooms available for new bookings.{" "}
            Currently, {stats[4].value} rooms are booked, {stats[5].value} pending confirmation,{" "}
            and {stats[6].value} are manually locked for administrative reasons.
          </p>
        </div>

        {/* Vacancy Rate and Subscription */}
        <VacancyRateCard totalRooms={732} availableRooms={260} />
      </motion.div>
        <RoomLockStatusTable/>
    </div>
  );
}
