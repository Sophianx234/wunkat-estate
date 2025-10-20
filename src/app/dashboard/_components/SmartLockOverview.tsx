"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

const smartLocks = [
  {
    property: "Palm Heights",
    unit: "A1",
    status: "Locked",
    battery: "82%",
    lastAccess: "10:23 AM",
    signal: "Strong",
  },
  {
    property: "Garden Court",
    unit: "B2",
    status: "Unlocked",
    battery: "65%",
    lastAccess: "09:40 AM",
    signal: "Good",
  },
  {
    property: "Azure Lodge",
    unit: "C3",
    status: "Locked",
    battery: "90%",
    lastAccess: "Yesterday",
    signal: "Excellent",
  },
  {
    property: "Hilltop Apartments",
    unit: "A2",
    status: "Disconnected",
    battery: "—",
    lastAccess: "2 days ago",
    signal: "None",
  },
  {
    property: "Sunset Villa",
    unit: "D1",
    status: "Locked",
    battery: "76%",
    lastAccess: "11:02 AM",
    signal: "Strong",
  },
];

export default function SmartLockOverview() {
  return (
    <Card className="w-full max-w-5xl mx-auto mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Smart Lock Overview</h2>
          <Button variant="outline" size="sm">
            Manage Locks
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead className="text-right">Last Access</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {smartLocks.map((lock, i) => (
              <TableRow key={i}>
                <TableCell>{lock.property}</TableCell>
                <TableCell>{lock.unit}</TableCell>
                <TableCell>
                  {lock.status === "Locked" && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1">
                      <Lock size={14} /> Locked
                    </Badge>
                  )}
                  {lock.status === "Unlocked" && (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 flex items-center gap-1">
                      <Unlock size={14} /> Unlocked
                    </Badge>
                  )}
                  {lock.status === "Disconnected" && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Disconnected
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{lock.battery}</TableCell>
                <TableCell>{lock.signal}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {lock.lastAccess}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p className="text-xs text-muted-foreground mt-4">
          Status of connected smart locks, signal strength, and last access times.
        </p>
      </CardContent>
    </Card>
  );
}
