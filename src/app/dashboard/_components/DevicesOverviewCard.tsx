"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RefreshCcw, WifiOff, Wifi, Battery } from "lucide-react";
import { useState, useEffect } from "react";

type Device = {
  id: string;
  name: string;
  property: string;
  status: "online" | "offline";
  lastSync: string;
  batteryLevel: number;
  icon?: string;
};

export default function DevicesOverviewCard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated example data (replace with backend API later)
    setTimeout(() => {
      setDevices([
        {
          id: "1",
          name: "Main Door Lock",
          property: "Palm Heights - Room 1",
          status: "online",
          lastSync: "2 mins ago",
          batteryLevel: 85,
        },
        {
          id: "2",
          name: "Side Door Lock",
          property: "Garden Court - Room 2",
          status: "offline",
          lastSync: "1 hour ago",
          batteryLevel: 45,
        },
        {
          id: "3",
          name: "Front Door Lock",
          property: "Azure Lodge - Room 5",
          status: "online",
          lastSync: "5 mins ago",
          batteryLevel: 95,
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;

  if (loading) {
    return (
      <Card className="w-full max-w-md rounded-xl shadow">
        <CardHeader>
          <CardTitle>Smart Lock Devices</CardTitle>
          <CardDescription>Checking device health...</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm animate-pulse">Loading devices...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md rounded-xl shadow">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Smart Lock Devices</CardTitle>
          <CardDescription>Device connectivity and battery status</CardDescription>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="p-1 rounded-md hover:bg-gray-100 transition"
        >
          <RefreshCcw className="w-4 h-4 text-gray-600" />
        </button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="flex justify-between items-center text-sm border-b pb-2">
          <p className="font-medium text-sm text-green-600">
            Online Devices: {onlineCount}
          </p>
          <p className="font-medium text-sm text-red-600">
            Offline Devices: {offlineCount}
          </p>
        </div>

        {/* Device List */}
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 transition"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={device.icon || "/lock-icon.png"}
                  alt={device.name}
                />
                <AvatarFallback>
                  {device.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium text-sm">{device.name}</p>
                <p className="text-xs text-gray-500">{device.property}</p>
              </div>
            </div>

            {/* Status + Battery */}
            <div className="flex flex-col items-end gap-1">
              <Badge
                className={`text-xs flex items-center gap-1 ${
                  device.status === "online"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {device.status === "online" ? (
                  <Wifi className="w-3 h-3" />
                ) : (
                  <WifiOff className="w-3 h-3" />
                )}
                {device.status}
              </Badge>

              <div className="flex items-center text-[11px] text-gray-600 gap-1">
                <Battery className="w-3 h-3" />
                {device.batteryLevel}% battery
              </div>
              <p className="text-[10px] text-gray-400">{device.lastSync}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
