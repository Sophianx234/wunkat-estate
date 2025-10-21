"use client";

import { FC, useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

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

const TransactionHistory: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/dashboard/recent-transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Card className="w-full">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Recent Transaction History</h2>

        {loading ? (
          <Skeleton className="h-[200px]" />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
