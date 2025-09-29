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


type customerTableProps = {
  customers: transactionType[];
};

export default function CustomerTable({ customers }: customerTableProps) {
    const [payments, setPayments] = useState<transactionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/payment",);
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

   const dataToShow = customers && customers.length > 0 ? customers : payments;
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
          {dataToShow.map((payment,i) => <CustomerTableRow key={payment._id} payment={payment} />)}
          
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
