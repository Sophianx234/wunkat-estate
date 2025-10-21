"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface SmartLockOverview {
  property: string;
  unit: string;
  status: "Locked" | "Unlocked" | "Disconnected";
  battery: string;
  signal: "Excellent" | "Strong" | "Good" | "Weak" | "None";
  lastAccess: string;
}

export default function SmartLockOverview() {
  const [locks, setLocks] = useState<SmartLockOverview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocks = async () => {
      try {
        const res = await fetch("/api/dashboard/smart-lock-overview");
        if (res.ok) {
          const data = await res.json();
          setLocks(data);
        }
      } catch (err) {
        console.error("Error fetching smart locks:", err);
      } finally {
        setLoading(false);
      }
    };
    getLocks();
  }, []);

  return (
    <Card className="w-full max-w-5xl mx-auto mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Smart Lock Overview</h2>
          <Button variant="outline" size="sm">
            Manage Locks
          </Button>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between space-x-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <>
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
                {locks.map((lock, i) => (
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
