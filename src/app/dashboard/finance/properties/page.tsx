"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiBed, GiSpookyHouse } from "react-icons/gi";
import { Lock, Unlock, Clock, KeyRound } from "lucide-react";
import SubscriptionCard from "@/app/_components/SubscriptionCard";
import { HomeStatsCard } from "../../_components/HomeStatsCard";
import VacancyRateCard from "../../_components/VacancyRateCard";
import RoomLockStatusTable from "../../_components/RoomLockStatus";
import FinancialStats from "../../_components/FinancialStats";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import HouseCard from "../../_components/HouseCard";
import PropertyCard from "../../_components/PropertyCard";
import { IHouse } from "@/models/House";
import { IRoom } from "../../properties/page";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export interface ModalDataResponse {
    description: string;
    items: (IRoom|IHouse)[];
  
}
export default function Overview() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [houses, setHouses] = useState<IHouse[]>([]);

  // 🔹 Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalDataResponse|null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  // Fetch dashboard summary stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/property");
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch (err) {
        console.error("Failed to fetch overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

   const handleDeleteHouse = async (houseId: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the house and its rooms.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/houses/${houseId}`, {
            method: "DELETE",
          });
  
          if (!res.ok) throw new Error("Failed to delete house");
  
          // Remove house from UI without reload
          setHouses((prev) => prev.filter((h) => h._id !== houseId));
  
          Swal.fire("Deleted!", "The house has been deleted.", "success");
        } catch (err) {
          console.error("Error deleting house:", err);
          Swal.fire("Error", "Something went wrong while deleting.", "error");
        }
      }
    };

    const handleEditHouse = (houseId: string) => {
    router.push(`/dashboard/properties/add-house/edit/${houseId}`);
  };
  // 🔹 Handle "View" button click
  const handleViewClick = async (type: string) => {
    setSelectedType(type);
    setIsModalOpen(true);
    setModalLoading(true);
    setModalData(null);

    try {
      const res = await fetch(`/api/dashboard/property/${type}`);
      const data = await res.json();
      if (res.ok){
        console.log("Fetched modal data:", data.data);
        setModalData(data.data);
      } 
    } catch (error) {
      console.error("Failed to fetch modal data:", error);
    } finally {
      setModalLoading(false);
    }
  };

  // 🧱 Skeleton placeholders while loading
  if (loading) {
    return (
      <div className="py-6 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm space-y-3"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm">
            <Skeleton className="h-5 w-40 mb-3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 🧮 Stats cards
  const statCards = [
    {
      title: "Total Houses",
      value: stats.totalHouses,
      icon: GiSpookyHouse,
      buttonLabel: "View ",
      key: "houses",
    },
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: GiBed,
      buttonLabel: "View ",
      key: "rooms",
    },
    {
      title: "Smartlock Rooms",
      value: stats.smartLockRooms,
      icon: Lock,
      buttonLabel: "view",
      key: "smartlocks",
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms,
      icon: Unlock,
      buttonLabel: "View ",
      key: "available",
    },
    {
      title: "Booked Rooms",
      value: stats.bookedRooms,
      icon: GiBed,
      buttonLabel: "View ",
      key: "booked",
    },
    {
      title: "Pending Rooms",
      value: stats.pendingRooms,
      icon: Clock,
      buttonLabel: "View ",
      key: "pending",
    },
    {
      title: "Manually Locked Rooms",
      value: stats.manuallyLockedRooms,
      icon: KeyRound,
      buttonLabel: "View",
      key: "locked",
    },
  ];

  return (
    <div className="py-6 space-y-8">
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
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            className={index === statCards.length - 1 ? "col-span-2" : ""}
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
              onButtonClick={() => handleViewClick(stat.key)}
            />
          </motion.div>
        ))}
        <SubscriptionCard />
      </motion.div>

      <FinancialStats />

      {/* Summary + Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4"
      >
        <div className="p-6 rounded-xl col-span-2 bg-white dark:bg-neutral-900 shadow-sm border border-gray-100 dark:border-neutral-800">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Summary
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            WunkatHomes currently manages {stats.totalHouses} houses and{" "}
            {stats.totalRooms} rooms. Out of these, {stats.smartLockRooms} are
            smartlock-enabled, {stats.availableRooms} rooms are available for
            new bookings, {stats.bookedRooms} are booked,{" "}
            {stats.pendingRooms} pending confirmation, and{" "}
            {stats.manuallyLockedRooms} are manually locked for administrative
            reasons.
          </p>
        </div>

        <VacancyRateCard
          totalRooms={stats.totalRooms}
          availableRooms={stats.availableRooms}
          bookedRooms={stats.bookedRooms}
        />
      </motion.div>

      <RoomLockStatusTable />

      {/* 🔹 Modal Section */}
     <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent
    className="sm:max-w-3xl p-6 rounded-2xl shadow-lg max-h-[80vh] flex flex-col"
  >
    <DialogHeader className="flex-shrink-0">
      <DialogTitle className="text-xl font-semibold capitalize flex items-center gap-2">
        {selectedType.replace(/([A-Z])/g, " $1")}
      </DialogTitle>
    </DialogHeader>

    {/* Scrollable content container */}
    <div className="overflow-y-auto scrollbar-hide flex-1 mt-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
      {modalLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ) : modalData && modalData.items?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* 🔹 Description */}
          {modalData.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-b border-gray-200 dark:border-neutral-800 pb-3 mb-3">
              {modalData.description}
            </p>
          )}

          {/* 🔹 Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {selectedType === "houses"
              ? modalData.items.map((house: any) => (
                  <HouseCard key={house._id} house={house} onEditHouse={handleEditHouse} onDeleteHouse={()=>handleDeleteHouse(house._id)} />
                ))
              : modalData.items.map((room: any) => (
                  <PropertyCard key={room._id} room={room} type="admin" />
                ))}
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500 mt-4 text-sm">
          No data found for this category.
        </p>
      )}
    </div>
  </DialogContent>
</Dialog>


    </div>
  );
}
