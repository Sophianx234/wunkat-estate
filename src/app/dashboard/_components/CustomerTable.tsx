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
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { transactionType } from "../transactions/PaymentHistory";
import CustomerTableRow from "./CustomerTableRow";

type customerTableProps = {
  customers: transactionType[];
};

export default function CustomerTable({ customers }: customerTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = customers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        {/* ✅ Normal horizontal table (desktop & tablets) */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-8 text-gray-500 py-4">Customer</TableHead>
                <TableHead className="py-4 text-gray-500">House</TableHead>
                <TableHead className="py-4 text-gray-500">Room</TableHead>
                <TableHead className="py-4 text-gray-500">Amount</TableHead>
                <TableHead className="text-center py-4 text-gray-500">Status</TableHead>
                <TableHead className="text-center py-4 text-gray-500">Due</TableHead>
                <TableHead className="text-center py-4 text-gray-500">Paid By</TableHead>
                <TableHead className="text-center py-4 text-gray-500">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentData.map((payment) => (
                <CustomerTableRow key={payment._id} payment={payment} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Vertical orientation (mobile) */}
        <div className="block md:hidden divide-y">
          {currentData.map((payment) => (
            <CustomerTableRow key={payment._id} payment={payment} mobile />
          ))}
        </div>
      </div>

      {/* ✅ Pagination */}
     {totalPages > 1 && (
  <div className="flex flex-col md:grid md:grid-cols-[2fr_3fr] md:justify-center gap-4 mt-6 items-center">
    {/* Info text */}
    <div className="text-sm text-[#868e96] font-bold text-center md:text-left">
      Showing {startIndex + 1} to {Math.min(endIndex, customers.length)} of{" "}
      {customers.length} entries
    </div>

    {/* Smart Pagination */}
    <div className="flex justify-center md:justify-end w-full">
      <Pagination>
        <PaginationContent className="flex flex-wrap justify-center gap-1 md:gap-2">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={`${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
            />
          </PaginationItem>

          {/* Smart Page Numbers */}
          {(() => {
            const pages = [];
            const maxRange = 2; // pages before/after current
            const total = totalPages;

            const start = Math.max(1, currentPage - maxRange);
            const end = Math.min(total, currentPage + maxRange);

            if (start > 1) {
              pages.push(1);
              if (start > 2) pages.push("...");
            }

            for (let i = start; i <= end; i++) {
              pages.push(i);
            }

            if (end < total) {
              if (end < total - 1) pages.push("...");
              pages.push(total);
            }

            return pages.map((page, index) =>
              page === "..." ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <span className="px-2 text-gray-500 select-none">...</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    className={`${
                      currentPage === page
                        ? "bg-black text-white"
                        : "bg-gray-200 text-black"
                    } px-3 py-1 rounded-md text-sm`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            );
          })()}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={`${
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
)}

    </div>
  );
}
