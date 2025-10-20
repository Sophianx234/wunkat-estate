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

  useEffect(() => {
    // Mock data – replace with fetch("/api/properties/insights")
    const timer = setTimeout(() => {
      setProperties([
        {
          name: "Palm Heights",
          city: "Accra",
          occupancy: 95,
          revenue: 18200,
          image: "/images/palm-heights.jpg",
          growth: 12.5,
        },
        {
          name: "Azure Lodge",
          city: "Kumasi",
          occupancy: 89,
          revenue: 14900,
          image: "/images/azure-lodge.jpg",
          growth: -3.2,
        },
        {
          name: "Sunset Villa",
          city: "Takoradi",
          occupancy: 80,
          revenue: 13200,
          growth: 8.1,
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p className="text-gray-500">Loading property insights...</p>;

  if (properties.length === 0)
    return <p className="text-gray-500">No property insights available.</p>;

  return (
    <Card className="w-full h-full max-w-sm rounded-xl shadow relative">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Top Performing Properties</CardTitle>
          <CardDescription>Insights from current rent revenue trends</CardDescription>
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
