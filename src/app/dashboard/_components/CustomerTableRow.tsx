import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { addDays, differenceInCalendarDays, isBefore, isPast } from "date-fns"
import { CalendarPlus, Eye, Lock, MoreVertical, Pencil, Trash2, Unlock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Swal from "sweetalert2"
import { Customer } from "../tenants/page"
import { Payment } from "./CustomerTable"
import ExtendRentModal from "./ExtendRentModal"
import EditCustomerModal from "./EditCuserModal"
type customerRowProps = {
  customer: Customer;
  payment: Payment;
};
function CustomerTableRow({customer,payment}: customerRowProps) {
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
          `Room ${customer.roomNumber} has been ${
            isLocked ? "unlocked" : "locked"
          }.`,
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
    
      <TableRow key={payment.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={payment.avatar} alt={payment.name} />
                  <AvatarFallback>{payment.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.email}</div>
                </div>
              </TableCell>
              {/* House */}
              <TableCell>{payment.amount}</TableCell>
              {/* Room */}
              <TableCell>{customer.roomNumber}</TableCell>
              {/* Amount */}
              <TableCell>{payment.amount}</TableCell>
              {/* Amount */}
              <TableCell>
                <Badge
                  variant={customer.rentStatus === "Paid" ? "default" : "secondary"}
                  className={customer.rentStatus === "Pending" ? "bg-gray-200 text-gray-800" : ""}
                >
                  {customer.rentStatus}
                </Badge>
              </TableCell>
                {/* Due */}
                              <TableCell>{payment.amount}</TableCell>
              {/* Paid by */}
              <TableCell>
                {payment.method === "visa" ? (
                  <Image src="/visa.svg" alt="Visa" width={40} height={24} />
                ) : (
                  <Image src="/mastercard.svg" alt="MasterCard" width={40} height={24} />
                )}
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
        <Link href={`/dashboard/tenants/${customer.id}`} className="w-full flex items-center">
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
        {customer.smartLockStatus === "locked" ? (
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
            </TableRow>
  )
}

export default CustomerTableRow
