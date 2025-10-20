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

  // ✅ Slice data for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = customers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="rounded-lg border p-2 shadow-sm bg-white py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-8 text-gray-500 py-4">Customer</TableHead>
              <TableHead className="py-4 text-gray-500">House Name</TableHead>
              <TableHead className="py-4 text-gray-500">Room Name</TableHead>
              <TableHead className="py-4 text-gray-500">Amount</TableHead>
              <TableHead className="text-center py-4 text-gray-500">Status</TableHead>
              <TableHead className="text-center py-4 text-gray-500">Due</TableHead>
              <TableHead className="text-center py-4 text-gray-500">Paid by</TableHead>
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

      {/* Pagination */}
      {customers.length > itemsPerPage && (
        <div className="grid grid-cols-[5fr_2fr] w-full mt-6 items-center">
          <div className="text-sm text-[#868e96] font-bold">
            Showing {startIndex + 1} to {Math.min(endIndex, customers.length)} of{" "}
            {customers.length} entries
          </div>

          <div className="flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
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

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
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
