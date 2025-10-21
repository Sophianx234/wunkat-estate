"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Property = {
  _id?: string;
  name: string;
  city: string;
  occupancy: number;
  revenue: number;
  image?: string;
  growth: number; // percentage growth
};

type PropertyInsightCardProps = {
  onClose?: () => void;
};

export default function PropertyInsightCard({ onClose }: PropertyInsightCardProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/dashboard/properties-insights");
        if (!res.ok) throw new Error("Failed to fetch property insights");
        const data = await res.json();
        setProperties(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load property insights");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    // 🩶 Skeleton Loader (3 rows)
    return (
      <Card className="w-full h-full max-w-sm rounded-xl shadow">
        <CardHeader>
          <CardTitle>Top Performing Properties</CardTitle>
          <CardDescription>Insights from current rent revenue trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="h-3 w-14 ml-auto" />
                <Skeleton className="h-3 w-10 ml-auto" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (properties.length === 0)
    return <p className="text-gray-500">No property insights available.</p>;

  return (
    <Card className="w-full h-full max-w-sm rounded-xl shadow relative">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Top Performing Properties</CardTitle>
          <CardDescription>
            Insights from current rent revenue trends
          </CardDescription>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {properties.map((property) => (
          <div
            key={property._id || property.name}
            className="flex items-center justify-between gap-2"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <Avatar>
                {property.image ? (
                  <AvatarImage src={property.image} alt={property.name} />
                ) : (
                  <AvatarFallback>
                    {property.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium text-sm">{property.name}</p>
                <p className="text-xs text-gray-500">{property.city}</p>
              </div>
            </div>

            {/* Revenue & Growth */}
            <div className="text-right">
              <p className="text-sm font-semibold">
                ₵{property.revenue.toLocaleString()}
              </p>
              <div className="flex items-center justify-end text-xs gap-1">
                {property.growth > 0 ? (
                  <>
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">+{property.growth}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3 h-3 text-red-600" />
                    <span className="text-red-600">{property.growth}%</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
