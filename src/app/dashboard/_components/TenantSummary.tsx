"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const tenants = [
  {
    name: "Kwame Mensah",
    email: "kwame.mensah@example.com",
    property: "Palm Heights",
    rent: "₵2,500",
    status: "Active",
    dueDate: "Oct 30, 2025",
  },
  {
    name: "Akua Boateng",
    email: "akua.boateng@example.com",
    property: "Garden Court",
    rent: "₵1,800",
    status: "Pending",
    dueDate: "Oct 25, 2025",
  },
  {
    name: "Yaw Owusu",
    email: "yaw.owusu@example.com",
    property: "Azure Lodge",
    rent: "₵2,200",
    status: "Overdue",
    dueDate: "Oct 10, 2025",
  },
  {
    name: "Ama Serwaa",
    email: "ama.serwaa@example.com",
    property: "Sunset Villa",
    rent: "₵1,950",
    status: "Active",
    dueDate: "Nov 5, 2025",
  },
];

export default function TenantSummary() {
  return (
    <Card className="w-full max-w-5xl mx-auto mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tenant Summary</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

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
            {tenants.map((t, i) => (
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
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Active
                    </Badge>
                  )}
                  {t.status === "Pending" && (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                      Pending
                    </Badge>
                  )}
                  {t.status === "Overdue" && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Overdue
                    </Badge>
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
