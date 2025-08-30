"use client";

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react"; // ✅ only the icon here
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // ✅ import Table and related parts here

type Transaction = {
  id: string;
  name: string;
  avatar: string;
  date: string;
  propertyType: string;
  propertyName: string;
  status: "Paid" | "Cancel";
  price: string;
};

const transactions: Transaction[] = [
  {
    id: "#ID144542",
    name: "David Nurmi",
    avatar: "/avatars/avatar1.png",
    date: "15 Dec 2024",
    propertyType: "Residential",
    propertyName: "456 Oak Avenue, NE 68502",
    status: "Paid",
    price: "$4,456,437",
  },
  {
    id: "#ID768237",
    name: "David Nurmi",
    avatar: "/avatars/avatar2.png",
    date: "14 Dec 2024",
    propertyType: "Land",
    propertyName: "789 Pine Road, WI 53703",
    status: "Cancel",
    price: "$7,475,567",
  },
  {
    id: "#ID856434",
    name: "David Nurmi",
    avatar: "/avatars/avatar3.png",
    date: "12 Dec 2024",
    propertyType: "Commercial",
    propertyName: "123 Maple Street, Springfield",
    status: "Paid",
    price: "$4,544,787",
  },
];

const TransactionHistory: FC = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Recent Transaction History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Orders</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead>Property Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={tx.avatar}
                    alt={tx.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.id}</p>
                  </div>
                </TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.propertyType}</TableCell>
                <TableCell>{tx.propertyName}</TableCell>
                <TableCell>
                  <Badge variant={tx.status === "Paid" ? "success" : "destructive"}>
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>{tx.price}</TableCell>
                <TableCell>
                  <MoreHorizontal className="w-5 h-5 cursor-pointer text-gray-500" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
