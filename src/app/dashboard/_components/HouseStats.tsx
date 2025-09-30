"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function HousesCard() {
  return (
    <Card className="py-4 pl-4 pr-2 shadow-sm border rounded-xl hover:shadow-md transition">
      <CardHeader className="space-y-3">
        {/* Icon + Label */}
        <div className="flex justify-between items-center">
          <CardDescription className="flex items-center gap-3 text-sm font-medium text-gray-500">
            <span className="p-3 rounded-xl bg-primary/10 text-primary">
              <Home className="w-8 h-8" /> {/* Bigger icon */}
            </span>
            <span className="text-nowrap text-base font-semibold">Total Houses</span>
          </CardDescription>
          <button className="px-2 py-1 text-xs border text-nowrap border-gray-500 rounded-md hover:bg-gray-50">
            View Houses
          </button>
        </div>

        {/* Big Number */}
        <CardTitle className="text-5xl font-extrabold tracking-tight text-gray-900">
          128
        </CardTitle>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="flex-col justify-between items-center w-full pt-4 border-t">
        <p className="text-muted-foreground text-sm">Updated this month</p>
      </CardFooter>
    </Card>
  );
}
