"use client";

import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Transaction = {
  id: string;
  name: string;
  avatar?: string;
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
    name: "Sarah Connor",
    avatar: "/avatars/avatar2.png",
    date: "14 Dec 2024",
    propertyType: "Land",
    propertyName: "789 Pine Road, WI 53703",
    status: "Cancel",
    price: "$7,475,567",
  },
  {
    id: "#ID856434",
    name: "Michael Scott",
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
              <TableHead>Tenant</TableHead>
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
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={tx.avatar} alt={tx.name} />
                    <AvatarFallback>
                      {tx.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.id}</p>
                  </div>
                </TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.propertyType}</TableCell>
                <TableCell>{tx.propertyName}</TableCell>
                <TableCell>
                  <Badge
                    variant={tx.status === "Paid" ? "default" : "destructive"}
                    className={`text-xs ${
                      tx.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
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
