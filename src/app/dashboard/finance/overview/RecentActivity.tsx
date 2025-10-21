"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export type PropertyOverviewType = {
  name: string;
  city: string;
  smartLock: boolean;
  occupancy: string;
  units: string;
  revenue: string;
};

export default function PropertyOverview() {
  const [properties, setProperties] = useState<PropertyOverviewType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOverview = async () => {
      try {
        const res = await fetch("/api/dashboard/property-overview");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getOverview();
  }, []);

  const visibleProperties = showAll ? properties : properties.slice(0, 5);

  return (
    <Card className="w-full max-w-5xl mx-auto mb-4">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Property Overview</h2>
          <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Smart Lock</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Units</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
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
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : visibleProperties.map((p, idx) => (
                  <TableRow key={idx}>
                    {/* Property Name */}
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{p.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{p.name}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* City */}
                    <TableCell>{p.city}</TableCell>

                    {/* Smart Lock */}
                    <TableCell>
                      {p.smartLock ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Enabled</Badge>
                      ) : (
                        <Badge variant="secondary">No Lock</Badge>
                      )}
                    </TableCell>

                    {/* Occupancy */}
                    <TableCell>{p.occupancy}</TableCell>

                    {/* Units */}
                    <TableCell>{p.units}</TableCell>

                    {/* Revenue */}
                    <TableCell className="text-right font-medium">{p.revenue}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {/* If collapsed and there are more items */}
        {!showAll && !loading && properties.length > 5 && (
          <p className="text-sm text-muted-foreground text-center mt-3">
            Showing 5 of {properties.length} properties
          </p>
        )}
      </CardContent>
    </Card>
  );
}
