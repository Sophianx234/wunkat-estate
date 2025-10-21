"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export type TenantStatus = "Active" | "Pending" | "Overdue";

export interface TenantSummary {
  name: string;
  email: string;
  property: string;
  rent: string;
  status: TenantStatus;
  dueDate: string;
}

export default function TenantSummary() {
  const [tenants, setTenants] = useState<TenantSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await fetch("/api/dashboard/tenant-summary");
        if (res.ok) {
          const data = await res.json();
          setTenants(data);
        }
      } catch (err) {
        console.error("Failed to fetch tenants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  // Show limited tenants if not expanded
  const visibleTenants = showAll ? tenants : tenants.slice(0, 5);

  return (
    <Card className="w-full max-w-5xl mx-auto mb-4">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tenant Summary</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
            disabled={loading || tenants.length <= 5}
          >
            {showAll ? "Collapse" : "View All"}
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? // Skeleton Loading Rows
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-14" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : visibleTenants.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{t.property}</TableCell>
                    <TableCell>{t.rent}</TableCell>
                    <TableCell>
                      {t.status === "Active" && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                      )}
                      {t.status === "Pending" && (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
                      )}
                      {t.status === "Overdue" && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Overdue</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{t.dueDate}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <p className="text-xs text-muted-foreground mt-4">
          Overview of tenant rent payments and lease status.
        </p>
      </CardContent>
    </Card>
  );
}
