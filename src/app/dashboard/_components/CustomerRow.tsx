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
    if (isPast(rentExpiry)) return "text-gray-700";
    if (isBefore(rentExpiry, addDays(today, 7))) return "text-gray-500";
    return "text-black";
  };

  const getDaysLeft = () => {
    const days = differenceInCalendarDays(rentExpiry, today);
    if (days < 0) return { label: "Expired", color: "text-red-400" };
    if (days === 0) return { label: "Expires today", color: "text-gray-500" };
    return {
      label: `${days} day${days > 1 ? "s" : ""} left`,
      color: "text-black",
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
      confirmButtonColor: isLocked ? "#000000" : "#000000",
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
      confirmButtonColor: "#000000",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Customer has been removed.", "success");
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all hover:shadow-lg">
      {/* Left - Avatar + Info */}
      <div className="flex items-center gap-5 min-w-0">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 transition-all group-hover:ring-gray-500">
          <Image
            src={customer.image || "/avatars/default.jpg"}
            alt={customer.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-bold text-black truncate">{customer.name}</h3>
          <p className="text-sm text-gray-500 truncate">
            {customer.apartment} — Room {customer.roomNumber}
          </p>

          <div className="mt-2 space-y-1">
            <p className="text-sm flex items-center gap-2 font-medium">
              <FaCalendarAlt className="shrink-0 text-black" />
              <span className={getRentStatusColor()}>{format(rentExpiry, "PPP")}</span>
            </p>
            <p className={`text-sm flex items-center gap-2 font-medium ${daysLeft.color}`}>
              <FaHourglassHalf className="shrink-0 text-black" />
              {daysLeft.label}
            </p>
          </div>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:ml-auto">
        {/* Lock/Unlock */}
        <button
          onClick={handleLockToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm transition hover:opacity-90 ${
            customer.smartLockStatus === "locked" ? "bg-black" : "bg-gray-800"
          }`}
        >
          {customer.smartLockStatus === "locked" ? (
            <>
              <FaUnlock className="text-sm" /> Unlock
            </>
          ) : (
            <>
              <FaLock className="text-sm" /> Lock
            </>
          )}
        </button>

        {/* Extend Rent */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium shadow-sm hover:bg-gray-800 transition"
        >
          Extend Rent
        </button>

        {/* Edit */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="p-2.5 flex items-center justify-center rounded-full bg-gray-100 text-black hover:text-white hover:bg-black transition"
        >
          <FaEdit className="text-lg" />
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="p-2.5 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
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
