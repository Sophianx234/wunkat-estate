"use client";

import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, DollarSign, Clock, Check, X } from "lucide-react";

type RenewalStatus = "due" | "upcoming" | "completed" | "overdue";

interface RealEstateRenewalCardProps {
  tenantName: string;
  tenantInitials?: string;
  propertyName: string;
  unit?: string;
  renewalDate: string | Date; // ISO or Date
  rentAmount: number;
  leaseTermMonths?: number;
  status?: RenewalStatus;
  onRenew?: () => void;
  onDecline?: () => void;
  className?: string;
}

function statusToBadge(status: RenewalStatus) {
  switch (status) {
    case "completed":
      return <Badge variant="outline">Completed</Badge>;
    case "upcoming":
      return <Badge className="text-blue-700 bg-blue-50">Upcoming</Badge>;
    case "overdue":
      return <Badge className="text-red-700 bg-red-50">Overdue</Badge>;
    case "due":
    default:
      return <Badge className="text-amber-800 bg-amber-50">Due</Badge>;
  }
}

export default function RealEstateRenewalCard({
  tenantName,
  tenantInitials,
  propertyName,
  unit,
  renewalDate,
  rentAmount,
  leaseTermMonths = 12,
  status = "upcoming",
  onRenew,
  onDecline,
  className = "",
}: RealEstateRenewalCardProps) {
  const date = typeof renewalDate === "string" ? new Date(renewalDate) : renewalDate;
  const formattedDate = format(date, "PPP"); // e.g. Jan 1, 2025
  const formattedTime = format(date, "p");

  return (
    <Card className={`max-w-md w-full ${className}`}>
      <CardContent className="flex gap-4 items-start">
        <div className="flex-shrink-0">
          <Avatar className="h-14 w-14">
            <AvatarFallback>{tenantInitials ?? tenantName.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm text-muted-foreground">{propertyName}{unit ? ` • ${unit}` : ""}</div>
              <h3 className="text-lg font-semibold truncate">{tenantName}</h3>
            </div>

            <div className="flex flex-col items-end gap-1">
              {statusToBadge(status)}
              <div className="text-xs text-muted-foreground">Lease: {leaseTermMonths} mo</div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="h-4 w-4" />
              <div className="truncate">{formattedDate} • <span className="text-muted-foreground">{formattedTime}</span></div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <DollarSign className="h-4 w-4" />
              <div className="font-medium">{rentAmount.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}</div>
              <span className="text-xs text-muted-foreground">/ month</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="h-4 w-4" />
              <div className="text-xs text-muted-foreground">Renewal window: 30 days before</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={onRenew} aria-label="Renew lease">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Renew</span>
              </div>
            </Button>

            <Button size="sm" variant="ghost" onClick={onDecline} aria-label="Decline renewal">
              <div className="flex items-center gap-2 text-red-600">
                <X className="h-4 w-4" />
                <span>Decline</span>
              </div>
            </Button>

            <div className="ml-auto text-xs text-muted-foreground">ID: <span className="font-mono">{(Math.random()*1e6|0).toString(16).toUpperCase()}</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


