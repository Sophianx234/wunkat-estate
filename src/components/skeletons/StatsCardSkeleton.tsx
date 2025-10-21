"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function StatCardSkeleton() {
  return (
    <div className="bg-white border w-full rounded-2xl p-5 shadow-sm flex flex-col justify-between animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start">
        <Skeleton className="h-4 w-24" /> {/* Title */}
        <Skeleton className="h-4 w-4 rounded-full" /> {/* Info icon */}
      </div>

      {/* Value */}
      <Skeleton className="h-8 w-20 mt-3" /> {/* Large stat value */}

      {/* Mini Chart Placeholder */}
      <div className="h-10 mt-2">
        <Skeleton className="h-full w-full rounded-md" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <Skeleton className="h-3 w-24" /> {/* Trend label */}
        <Skeleton className="h-3 w-10" /> {/* Change percentage */}
      </div>
    </div>
  );
}
