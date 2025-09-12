"use client";
import {
  addDays,
  differenceInCalendarDays,
  format,
  isBefore,
  isPast,
} from "date-fns";
import Image from "next/image";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaHourglassHalf,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Customer } from "../customers/page";
import EditCustomerModal from "./EditCuserModal";
import ExtendRentModal from "./ExtendRentModal";

type customerRowProps = {
  customer: Customer;
};

export default function CustomerRow({ customer }: customerRowProps) {
  const rentExpiry = new Date(customer.rentExpiry);
  const today = new Date();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExtendRent = (newDate: string) => {
    Swal.fire("Rent Extended", `New rent expiry: ${newDate}`, "success");
  };

  const getRentStatusColor = () => {
    if (isPast(rentExpiry)) return "text-red-600";
    if (isBefore(rentExpiry, addDays(today, 7))) return "text-yellow-500";
    return "text-green-600";
  };

  const getDaysLeft = () => {
    const days = differenceInCalendarDays(rentExpiry, today);
    if (days < 0) return { label: "Expired", color: "text-red-600" };
    if (days === 0) return { label: "Expires today", color: "text-yellow-600" };
    return {
      label: `${days} day${days > 1 ? "s" : ""} left`,
      color: "text-green-600",
    };
  };

  const daysLeft = getDaysLeft();

  const handleLockToggle = async () => {
    const isLocked = customer.smartLockStatus === "locked";

    const result = await Swal.fire({
      title: isLocked ? "Unlock Room?" : "Lock Room?",
      text: `Are you sure you want to ${isLocked ? "unlock" : "lock"} this room?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isLocked ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: isLocked ? "Yes, Unlock it!" : "Yes, Lock it!",
    });

    if (result.isConfirmed) {
      Swal.fire(
        isLocked ? "Unlocked!" : "Locked!",
        `Room ${customer.roomNumber} has been ${isLocked ? "unlocked" : "locked"}.`,
        "success"
      );
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Customer?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Customer has been removed.", "success");
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-lg hover:border-gray-200">
      {/* Left - Image + Info */}
      <div className="flex items-center gap-5 w-full sm:w-auto">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-200 transition">
          <Image
            src={customer.image || "/avatars/default.jpg"}
            alt={customer.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
          <p className="text-sm text-gray-500">
            {customer.apartment} — Room {customer.roomNumber}
          </p>

          <div className="mt-2 space-y-1">
            <p className="text-sm flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <span className={getRentStatusColor()}>
                {format(rentExpiry, "PPP")}
              </span>
            </p>
            <p className={`text-sm flex items-center gap-2 ${daysLeft.color}`}>
              <FaHourglassHalf />
              {daysLeft.label}
            </p>
          </div>
        </div>
      </div>

      {/* Right - Buttons */}
      <div className="flex flex-wrap items-center gap-3 ml-auto">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 ${
            customer.smartLockStatus === "locked" ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={handleLockToggle}
        >
          {customer.smartLockStatus === "locked" ? (
            <span className="flex items-center gap-2">
              <FaUnlock className="text-sm" />
              Unlock
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <FaLock className="text-sm" />
              Lock
            </span>
          )}
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow-sm hover:bg-blue-600 transition-all"
        >
          Extend Rent
        </button>

        <button
          onClick={() => setIsEditOpen(true)}
          className="p-2.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition"
        >
          <FaEdit className="text-lg" />
        </button>

        <button
          className="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
          onClick={handleDelete}
        >
          <RiDeleteBin6Line className="text-lg" />
        </button>
      </div>

      {/* Modals */}
      <ExtendRentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentDate={customer.rentExpiry}
        onConfirm={handleExtendRent}
      />

      <EditCustomerModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        customer={customer}
        onSave={(updatedData) => {
          console.log("Updated customer:", updatedData);
        }}
      />
    </div>
  );
}
