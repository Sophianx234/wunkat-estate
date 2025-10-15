"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon|IconType;
  buttonLabel: string;
  onButtonClick?: () => void;
};

export function HomeStatsCard({ title, value, icon: Icon, buttonLabel, onButtonClick }: StatsCardProps) {
  return (
    <Card className="py-5 px-6  w-full h-full shadow-sm border rounded-xl hover:shadow-md transition bg-white">
      <CardHeader className="space-y-4 p-0">
        {/* Icon + Title + Button */}
        <div className="flex justify-between gap-4 items-center ">
          <CardDescription className="flex items-center gap-3 text-sm font-medium text-gray-500">
            <span className="p-3 rounded-xl bg-primary/10 text-primary">
              <Icon className="w-8 h-8" />
            </span>
            <span className="text-base text-wrap leading-4 font-semibold text-gray-700">{title}</span>
          </CardDescription>

          <Button
            variant="outline"
            size="sm"
            onClick={onButtonClick}
            className="text-xs  font-medium"
          >
            {buttonLabel}
          </Button>
        </div>

        {/* Value */}
        <CardTitle className="text-5xl font-extrabold tracking-tight text-gray-900">
          {value}
        </CardTitle>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="pt-4 border-t p-0 mt-4">
        <p className="text-muted-foreground text-sm">Updated this month</p>
      </CardFooter>
    </Card>
  );
}