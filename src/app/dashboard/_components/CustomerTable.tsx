"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { transactionType } from "../transactions/PaymentHistory";
import CustomerTableRow from "./CustomerTableRow";

type customerTableProps = {
  customers: transactionType[];
};

export default function CustomerTable({ customers }: customerTableProps) {
  const [payments, setPayments] = useState<transactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Decide which dataset to use (filtered or default payments)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/payment");
        const data = await res.json();
        console.log("dataxxxx", data);
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
  // ✅ Slice data for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataToShow.slice(startIndex, endIndex);

  const totalPages = Math.ceil(dataToShow.length / itemsPerPage);
  if (loading) return <p className="p-4">Loading...</p>;
  return (
    <div className="  w-full  ">
      <div className="rounded-lg border p-2 shadow-sm bg-white py-4 ">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              {" "}
              {/* sets row height instead of py-12 */}
              <TableHead className="pl-12 text-gray-500 py-4">
                Customer
              </TableHead>
              <TableHead className=" py-4 text-gray-500">House Name</TableHead>
              <TableHead className=" py-4 text-gray-500">Room Name</TableHead>
              <TableHead className=" py-4 text-gray-500">Amount</TableHead>
              <TableHead className="text-center py-4 text-gray-500">
                Status
              </TableHead>
              <TableHead className="text-center py-4 text-gray-500">
                Due
              </TableHead>
              <TableHead className="text-center py-4 text-gray-500">
                Paid by
              </TableHead>
              <TableHead className="text-center py-4 text-gray-500">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataToShow.map((payment, i) => (
              <CustomerTableRow key={payment._id} payment={payment} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="grid grid-cols-[5fr_2fr] w-full mt-6 items-center  ">
  {/* ✅ Showing X to Y of Z entries */}
  <div className="text-sm text-[#868e96] font-bold">
    Showing {startIndex + 1} to {Math.min(endIndex, dataToShow.length)} of{" "}
    {dataToShow.length} entries
  </div>

  <div className="">
    <Pagination className="">
      <PaginationContent>
        {/* Prev button */}
        <PaginationItem>
          <PaginationPrevious
            
            size="default"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Dynamic page numbers */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              size="default"
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i + 1);
              }}
              className={
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            
            size="default"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
</div>

    </div>
  );
}
