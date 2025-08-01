'use client';

import { useDashStore } from '@/lib/store';
import {
  Home,
  BadgeCheck,
  FileText,
  CalendarDays,
  DollarSign,
  MapPin,
} from 'lucide-react';

export default function TenantCard() {
  const { user } = useDashStore();

  return (
    <div className="md:fixed col-span-2 mt-20 md:mt-0 md:w-64 md:-translate-y-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Tenant Details</h1>

      <div className="bg-white p-5 rounded-xl shadow border transition-all hover:shadow-md">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative rounded-full overflow-hidden size-20 border">
            <img
              src={user?.profile}
              alt="Tenant Profile"
              className="rounded-full object-cover w-full h-full"
            />
          </div>

          <h2 className="mt-3 text-base font-semibold">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        {/* Info Section */}
        <div className="mt-5 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Lease:</span>
            <span className="ml-auto">Yearly</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <BadgeCheck className="w-4 h-4 text-green-600" />
            <span className="font-medium">Status:</span>
            <span className="ml-auto text-green-700">Active</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Unit:</span>
            <span className="ml-auto text-xs">Merpur #045167</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <DollarSign className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Rent:</span>
            <span className="ml-auto">$1,200</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <CalendarDays className="w-4 h-4 text-gray-600" />
            <span className="font-medium">Ends:</span>
            <span className="ml-auto">Jan 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
