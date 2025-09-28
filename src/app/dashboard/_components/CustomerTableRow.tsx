import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { formatDate, formatNumber, removeUnderscores } from "@/lib/utils"
import { addDays, differenceInCalendarDays, isBefore, isPast } from "date-fns"
import { CalendarPlus, Eye, Lock, MoreVertical, Pencil, Trash2, Unlock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Swal from "sweetalert2"
import { transactionType } from "../transactions/PaymentHistory"
import EditCustomerModal from "./EditCuserModal"
import ExtendRentModal from "./ExtendRentModal"
type customerRowProps = {
  
  payment: transactionType;
};
function CustomerTableRow({payment}: customerRowProps) {
  const rentExpiry = new Date(payment.expiresAt);
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
      const isLocked = payment.roomId.lockStatus === "locked";
  
      const result = await Swal.fire({
        title: isLocked ? "Unlock Room?" : "Lock Room?",
        text: `Are you sure you want to ${
          isLocked ? "unlock" : "lock"
        } this room?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: isLocked ? "#000000" : "#000000",
        cancelButtonColor: "#6b7280",
        confirmButtonText: isLocked ? "Yes, Unlock it!" : "Yes, Lock it!",
      });
  
      if (result.isConfirmed) {
        Swal.fire(
          isLocked ? "Unlocked!" : "Locked!",
          `Room ${payment.roomId.name} has been ${
            isLocked ? "unlocked" : "locked"
          }.`,
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
        confirmButtonColor: "#000000",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Delete",
      });
  
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `Tenant ${payment.userId.name} has been removed.`, "success");
      }
    };
  return (
    
      <TableRow key={payment._id}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={payment.userId.profile} alt={payment.userId.name} />
                  <AvatarFallback>{payment.userId.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{payment.userId.name}</div>
                  <div className="text-sm text-muted-foreground">{payment.userId.email}</div>
                </div>
              </TableCell>
              {/* House */}
              <TableCell className="text-xs ">{payment.roomId.houseId.name}</TableCell>
              {/* Room */}
              <TableCell className="text-xs ">{payment.roomId.name}</TableCell>
              {/* Amount */}
              <TableCell className="text-xs ">₵{formatNumber(payment.amount) }</TableCell>
              {/* Amount */}
              <TableCell className="text-xs text-center">
                <Badge
                  variant={payment.roomId.status === "booked"  ? "default" : "secondary"}
                  className={payment.roomId.status === "pending" ? "bg-gray-200 text-gray-800" :payment.roomId.status === "available"  ? "bg-green-200":''}
                >
                  {payment.roomId.status}
                </Badge>
              </TableCell>
                {/* Due */}
                              <TableCell className="text-xs text-center">
                                <span className={daysLeft.color}>{daysLeft.label}</span>
                              </TableCell>
              {/* Paid by */}
              <TableCell className="text-xs text-center" >
                {removeUnderscores(payment.paymentMethod)}
              </TableCell>

              <TableCell className="">
          <TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <MoreVertical className="h-5 w-5 text-gray-600" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-44">
      {/* View */}
      <DropdownMenuItem asChild>
        <Link href={`/dashboard/tenants/${payment.userId._id}`} className="w-full flex items-center">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Link>
      </DropdownMenuItem>

      {/* Edit */}
      <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </DropdownMenuItem>

      {/* Extend Rent */}
      <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
        <CalendarPlus className="mr-2 h-4 w-4" />
        Extend Rent
      </DropdownMenuItem>

      {/* Lock / Unlock */}
      <DropdownMenuItem onClick={handleLockToggle}>
        {payment.roomId.lockStatus === "locked" ? (
          <>
            <Unlock className="mr-2 h-4 w-4" />
            Unlock Room
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Lock Room
          </>
        )}
      </DropdownMenuItem>

      {/* Delete */}
      <DropdownMenuItem
        onClick={handleDelete}
        className=""
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
              </TableCell>
               <ExtendRentModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              currentDate={formatDate(rentExpiry)}
              onConfirm={handleExtendRent}
            />
      
            <EditCustomerModal
              isOpen={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              customer={payment.userId }
              onSave={(updatedData) => {
                console.log("Updated customer:", updatedData);
              }}
            />
            </TableRow>
  )
}

export default CustomerTableRow
