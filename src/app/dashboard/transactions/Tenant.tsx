"use client";

import { useDashStore } from "@/lib/store";
import { daysLeft, formatDate, formatNumber } from "@/lib/utils";
import { IHouse } from "@/models/House";
import { IPayment } from "@/models/Payment";
import { IRoom } from "@/models/Room";
import {
  BadgeCheck,
  CalendarDays,
  DollarSign,
  FileText,
  MapPin,
} from "lucide-react";

export type TenantCardProps = {
  currTransaction?: IPayment & { roomId: IRoom & { houseId: IHouse } };
};

export default function TenantCard({ currTransaction }: TenantCardProps) {
  const { user } = useDashStore();
  const isActive =
    currTransaction?.expiresAt &&
    daysLeft(currTransaction.expiresAt) > 0;

  return (
    <aside className=" md:w-72 md:-translate-y-6">
    

      <div className="bg-white rounded-2xl h-fit border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 rounded-full border-2 border-gray-200 overflow-hidden shadow-sm">
            <img
              src={user?.profile || "/placeholder.png"}
              alt="Tenant Profile"
              className="object-cover w-full h-full"
            />
          </div>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>

          <div
            className={`mt-3 px-3 py-1 text-xs font-medium rounded-full ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActive ? "Active Tenant" : "Expired Lease"}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* Info Grid */}
        <div className="space-y-3 text-sm text-gray-700">
          {/* Lease Type */}
          <InfoRow
            icon={<FileText className="w-4 h-4 text-gray-500" />}
            label="Lease Type"
            value={currTransaction?.roomId?.planType || "--"}
          />

          {/* Rent */}
          <InfoRow
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            label="Rent"
            value={
              currTransaction?.roomId?.price
                ? `₵${formatNumber(currTransaction.roomId.price)}`
                : "--"
            }
          />

          {/* Location */}
          <InfoRow
            icon={<MapPin className="w-4 h-4 text-gray-500" />}
            label="Location"
            value={
              currTransaction?.roomId?.houseId?.location?.city || "N/A"
            }
          />

          {/* Lease End Date */}
          <InfoRow
            icon={<CalendarDays className="w-4 h-4 text-gray-500" />}
            label="Ends"
            value={
              currTransaction?.expiresAt
                ? formatDate(currTransaction.expiresAt)
                : "--"
            }
          />

          {/* Lease Status */}
          <InfoRow
            icon={
              <BadgeCheck
                className={`w-4 h-4 ${
                  isActive ? "text-green-500" : "text-red-500"
                }`}
              />
            }
            label="Status"
            value={
              isActive ? (
                <span className="text-green-700 font-medium">Active</span>
              ) : (
                <span className="text-red-700 font-medium">Expired</span>
              )
            }
          />
        </div>
      </div>
    </aside>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors px-3 py-2 rounded-lg">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-gray-800 text-sm font-medium">{value}</span>
    </div>
  );
}
