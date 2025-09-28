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
import { useEffect, useState } from "react"
import { addDays, differenceInCalendarDays, isBefore, isPast } from "date-fns"
import { Customer } from "../tenants/page"
import CustomerTableRow from "./CustomerTableRow"
import ExtendRentModal from "./ExtendRentModal"
import EditCustomerModal from "./EditCuserModal"
import { transactionType } from "../transactions/PaymentHistory"
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// export type Payment = {
//   id: number
//   name: string
//   email: string
//   amount: string
//   status: "Paid" | "Pending"
//   method: "visa" | "mastercard"
//   avatar: string
// }

/* const payments: Payment[] = [
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
] */
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
    const [payments, setPayments] = useState<transactionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/payment", { cache: "no-store" });
        const data = await res.json();
        console.log('dataxxxx',data)
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);
  if (loading) return <p className="p-4">Loading...</p>;
  return (
    <div className="   ">
      <div className="rounded-lg border p-2 shadow-sm bg-white py-4 ">

      <Table >
       <TableHeader>
  <TableRow className=""> {/* sets row height instead of py-12 */}
    <TableHead className="pl-12 text-gray-500 py-4">Customer</TableHead>
    <TableHead className=" py-4 text-gray-500">House Name</TableHead>
    <TableHead className=" py-4 text-gray-500">Room Name</TableHead>
    <TableHead className=" py-4 text-gray-500">Amount</TableHead>
    <TableHead className="text-center py-4 text-gray-500">Status</TableHead>
    <TableHead className="text-center py-4 text-gray-500">Due</TableHead>
    <TableHead className="text-center py-4 text-gray-500">Paid by</TableHead>
    <TableHead className="text-center py-4 text-gray-500">Actions</TableHead>
  </TableRow>
</TableHeader>

        <TableBody>
          {payments.map((payment,i) => <CustomerTableRow key={payment._id} payment={payment} />)}
          
        </TableBody>
      </Table>
      </div>

      {/* Pagination */}
      <div className="grid grid-cols-[5fr_2fr] w-full mt-6 items-center px-3 ">
        <div className="text-sm text-[#868e96] font-bold">Showing 1 to 5 of 25 entries</div>
        <div className="d">

        <Pagination className="  w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className="bg-black text-white" size="default">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="bg-gray-200 text-black" href="#" size="default">2</PaginationLink>
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
