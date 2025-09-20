"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Customer } from "../tenants/page";

type Props = {
  data: Customer[];
};

import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "apartment",
    header: "Apartment",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "roomNumber",
    header: "Room Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "rentStatus",
    header: "Rent Status",
    cell: (info) => info.getValue(),
  },
];

export default function CustomersTable({ data }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rentFilter, setRentFilter] = useState<
    "all" | "active" | "due_soon" | "expired"
  >("all");

  const filteredData = useMemo(() => {
    let filtered = data;
    if (globalFilter) {
      filtered = filtered.filter((c) =>
        [c.name, c.email, c.phone, c.location, c.apartment, c.roomNumber]
          .join(" ")
          .toLowerCase()
          .includes(globalFilter.toLowerCase())
      );
    }
    if (rentFilter !== "all") {
      filtered = filtered.filter((c) => c.rentStatus === rentFilter);
    }
    return filtered;
  }, [data, globalFilter, rentFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Customers</CardTitle>
            <p className="text-sm text-gray-500">
              Manage and monitor all tenants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search customers..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" size="icon">
              <Search className="w-4 h-4" />
            </Button>
            <select
              value={rentFilter}
              onChange={(e) => setRentFilter(e.target.value as any)}
              className="rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="due_soon">Due Soon</option>
              <option value="expired">Expired</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-6 space-y-4">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id}>
            {flexRender(
              row.getVisibleCells()[0].column.columnDef.cell,
              row.getVisibleCells()[0].getContext()
            )}
          </div>
        ))}
        {table.getRowModel().rows.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-10">
            No customers found
          </p>
        )}
      </CardContent>
    </Card>
  );
}
