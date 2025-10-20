"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const properties = [
  {
    name: "Palm Heights",
    city: "Accra",
    smartLock: true,
    occupancy: "92%",
    units: "12 / 13",
    revenue: "₵14,200",
  },
  {
    name: "Garden Court",
    city: "Tamale",
    smartLock: false,
    occupancy: "75%",
    units: "9 / 12",
    revenue: "₵10,500",
  },
  {
    name: "Azure Lodge",
    city: "Kumasi",
    smartLock: true,
    occupancy: "88%",
    units: "8 / 9",
    revenue: "₵11,900",
  },
  {
    name: "Sunset Villa",
    city: "Takoradi",
    smartLock: true,
    occupancy: "80%",
    units: "10 / 12",
    revenue: "₵9,800",
  },
  {
    name: "Hilltop Apartments",
    city: "Cape Coast",
    smartLock: false,
    occupancy: "70%",
    units: "7 / 10",
    revenue: "₵8,600",
  },
];

export default function PropertyOverview() {
  return (
    <Card className="w-full max-w-5xl mx-auto mb-4">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Property Overview</h2>
          <Button variant="outline" size="sm">
            View All
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
            {properties.map((p, idx) => (
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
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Enabled
                    </Badge>
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

        
      </CardContent>
    </Card>
  );
}
