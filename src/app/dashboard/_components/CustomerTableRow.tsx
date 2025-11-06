"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate, formatNumber, removeUnderscores } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import {
  CalendarPlus,
  Eye,
  Lock,
  MoreVertical,
  Pencil,
  Trash2,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { transactionType } from "../transactions/PaymentHistory";
import EditCustomerModal from "./EditCuserModal";
import ExtendRentModal from "./ExtendRentModal";

type CustomerRowProps = {
  payment: transactionType;
  mobile?: boolean;
};

export default function CustomerTableRow({ payment, mobile = false }: CustomerRowProps) {
  const rentExpiry = new Date(payment.expiresAt);
  const today = new Date();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysLeftValue = differenceInCalendarDays(rentExpiry, today);

  const daysLeft =
    daysLeftValue < 0
      ? { label: "Expired", color: "text-red-400" }
      : daysLeftValue === 0
      ? { label: "Expires today", color: "text-gray-500" }
      : { label: `${daysLeftValue} day${daysLeftValue > 1 ? "s" : ""} left`, color: "text-black" };

  const handleLockToggle = async () => {
    const isLocked = payment.roomId.lockStatus === "locked";
    const result = await Swal.fire({
      title: isLocked ? "Unlock Room?" : "Lock Room?",
      text: `Are you sure you want to ${isLocked ? "unlock" : "lock"} this room?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6b7280",
      confirmButtonText: isLocked ? "Yes, Unlock it!" : "Yes, Lock it!",
    });

    if (result.isConfirmed) {
      Swal.fire(
        isLocked ? "Unlocked!" : "Locked!",
        `Room ${payment.roomId.name} has been ${isLocked ? "unlocked" : "locked"}.`,
        "success"
      );
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `Delete Tenant ${payment.userId.name}?`,
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", `Tenant ${payment.userId.name} has been removed.`, "success");
    }
  };

if (mobile) {
  // ✅ Modern, Professional Mobile Card Layout
  return (
    <div className="p-4 border-b bg-white hover:bg-gray-50 transition-colors">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={payment.userId.profile} alt={payment.userId.name} />
            <AvatarFallback>{payment.userId.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-gray-900">{payment.userId.name}</p>
            <p className="text-xs text-gray-500">{payment.userId.email}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/tenants/${payment.userId._id}`}
                className="flex items-center w-full"
              >
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit Tenant
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
              <CalendarPlus className="mr-2 h-4 w-4" /> Extend Rent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLockToggle}>
              {payment.roomId.lockStatus === "locked" ? (
                <>
                  <Unlock className="mr-2 h-4 w-4" /> Unlock Room
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Lock Room
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Details Section */}
      <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-gray-700">
        <div>
          <p className="font-medium text-gray-500">House</p>
          <p className="font-semibold text-gray-900">{payment.roomId.houseId.name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Room</p>
          <p className="font-semibold text-gray-900">{payment.roomId.name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Amount</p>
          <p className="font-semibold text-gray-900">₵{formatNumber(payment.amount)}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Paid By</p>
          <p className="font-semibold text-gray-900">
            {removeUnderscores(payment.paymentMethod)}
          </p>
        </div>
      </div>

      {/* Status Section */}
      <div className="mt-3 flex items-center justify-between">
        <Badge
          className={`${
            daysLeftValue <= 0
              ? "bg-red-200 text-red-800"
              : daysLeftValue <= 10
              ? "bg-amber-200 text-amber-900"
              : "bg-green-200 text-green-900"
          } px-2 py-0.5 text-xs font-semibold`}
        >
          {daysLeftValue <= 0
            ? "Expired"
            : daysLeftValue <= 10
            ? "Due Soon"
            : "Active"}
        </Badge>

        <span className={`text-xs font-medium ${daysLeft.color}`}>
          {daysLeft.label}
        </span>
      </div>

      {/* Modals */}
      <ExtendRentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentDate={formatDate(rentExpiry)}
        onConfirm={(newDate) =>
          Swal.fire("Rent Extended", `New rent expiry: ${newDate}`, "success")
        }
      />

      <EditCustomerModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        customer={payment.userId}
        onSave={(updatedData) => console.log("Updated customer:", updatedData)}
      />
    </div>
  );
}


  // ✅ Desktop Table Row Layout
  return (
    <TableRow key={payment._id}>
      <TableCell className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={payment.userId.profile} alt={payment.userId.name} />
          <AvatarFallback>{payment.userId.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{payment.userId.name}</div>
          <div className="text-xs text-muted-foreground">{payment.userId.email}</div>
        </div>
      </TableCell>
      <TableCell className="text-xs">{payment.roomId.houseId.name}</TableCell>
      <TableCell className="text-xs">{payment.roomId.name}</TableCell>
      <TableCell className="text-xs tracking-tighter">₵{formatNumber(payment.amount)}</TableCell>
      <TableCell className="text-xs text-center">
        <Badge
          className={
            daysLeftValue <= 0
              ? "bg-red-300 text-red-950"
              : daysLeftValue <= 10
              ? "bg-amber-300 text-amber-950"
              : "bg-green-300 text-green-950"
          }
        >
          <span className="text-xs">
            {daysLeftValue <= 0
              ? "Expired"
              : daysLeftValue <= 10
              ? "Due Soon"
              : "Active"}
          </span>
        </Badge>
      </TableCell>
      <TableCell className="text-xs text-center">
        <span className={daysLeft.color}>{daysLeft.label}</span>
      </TableCell>
      <TableCell className="text-xs text-center">
        {removeUnderscores(payment.paymentMethod)}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/tenants/${payment.userId._id}`} className="w-full flex items-center">
                <Eye className="mr-2 h-4 w-4" /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
              <CalendarPlus className="mr-2 h-4 w-4" /> Extend Rent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLockToggle}>
              {payment.roomId.lockStatus === "locked" ? (
                <>
                  <Unlock className="mr-2 h-4 w-4" /> Unlock Room
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Lock Room
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
