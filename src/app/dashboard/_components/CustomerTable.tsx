"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import Swal from "sweetalert2"
import { useState } from "react"
import { addDays, differenceInCalendarDays, isBefore, isPast } from "date-fns"
import { Customer } from "../tenants/page"
import CustomerTableRow from "./CustomerTableRow"
import ExtendRentModal from "./ExtendRentModal"
import EditCustomerModal from "./EditCuserModal"
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export type Payment = {
  id: number
  name: string
  email: string
  amount: string
  status: "Paid" | "Pending"
  method: "visa" | "mastercard"
  avatar: string
}

const payments: Payment[] = [
  {
    id: 1,
    name: "Jack Alfredo",
    email: "jack@shadcnstudio.com",
    amount: "$316.00",
    status: "Paid",
    method: "mastercard",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Maria Gonzalez",
    email: "maria.g@shadcnstudio.com",
    amount: "$253.40",
    status: "Pending",
    method: "visa",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@shadcnstudio.com",
    amount: "$852.00",
    status: "Paid",
    method: "mastercard",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Emily Carter",
    email: "emily.carter@shadcnstudio.com",
    amount: "$889.00",
    status: "Pending",
    method: "visa",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@shadcnstudio.com",
    amount: "$723.16",
    status: "Paid",
    method: "mastercard",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
]
const customerx = [
  {
    id: 1,
    name: "James Carter",
    email: "jamescarter@gmail.com",
    phone: "+233 244 123 456",
    location: "Brooklyn, NY",
    apartment: "Willow Apartments",
    roomNumber: "202",
    rentExpiry: "2025-08-10",
    rentStatus: "active",
    smartLockStatus: "locked",
    image: "/images/prof-1.jpg",
  },
  {
    id: 2,
    name: "Sophia West",
    email: "sophia.west@example.com",
    phone: "+233 245 876 321",
    location: "Queens, NY",
    apartment: "Maple Heights",
    roomNumber: "305",
    rentExpiry: "2025-07-20",
    rentStatus: "pending",
    smartLockStatus: "unlocked",
    image: "/images/prof-2.jpg",
  },
  {
    id: 3,
    name: "Daniel Kim",
    email: "daniel.kim@gmail.com",
    phone: "+233 240 777 000",
    location: "Manhattan, NY",
    apartment: "Cedar Villas",
    roomNumber: "101",
    rentExpiry: "2025-06-30",
    rentStatus: "expired",
    smartLockStatus: "locked",
    image: "/images/prof-3.jpg",
  },
  {
    id: 4,
    name: "Amina Abubakar",
    email: "amina.a@gmail.com",
    phone: "+233 550 123 999",
    location: "Kumasi, Ghana",
    apartment: "Zongo Estates",
    roomNumber: "14B",
    rentExpiry: "2025-09-01",
    rentStatus: "active",
    smartLockStatus: "unlocked",
    image: "/images/prof-1.jpg",
  },
  {
    id: 5,
    name: "Kwame Owusu",
    email: "kwameowusu@example.com",
    phone: "+233 208 333 111",
    location: "Accra, Ghana",
    apartment: "East Legon Hills",
    roomNumber: "4C",
    rentExpiry: "2025-07-18",
    rentStatus: "due_soon",
    smartLockStatus: "locked",
    image: "/images/prof-2.jpg",
  },
];




export default function CustomerTable() {
  
  
  return (
    <div className="   ">
      <Table className="rounded-lg border shadow-2xl bg-white py-4 ">
       <TableHeader>
  <TableRow className="h-16"> {/* sets row height instead of py-12 */}
    <TableHead className="pl-12 py-4">Customer</TableHead>
    <TableHead className=" py-4">House</TableHead>
    <TableHead className=" py-4">Room</TableHead>
    <TableHead className=" py-4">Amount</TableHead>
    <TableHead className=" py-4">Status</TableHead>
    <TableHead className=" py-4">Due</TableHead>
    <TableHead className=" py-4">Paid by</TableHead>
    <TableHead className=" py-4">Actions</TableHead>
  </TableRow>
</TableHeader>

        <TableBody>
          {customerx.map((customer,i) => <CustomerTableRow key={customer.id} customer={customer} payment={payments[i]} />)}
          
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="grid grid-cols-[5fr_2fr] w-full mt-4 items-center px-3 ">
        <div className="text-sm text-[#868e96] font-bold">Showing 1 to 5 of 25 entries</div>
        <div className="d">

        <Pagination className="  w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive size="default">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" size="default">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        </div>
      </div>
      
    </div>
  )
}
