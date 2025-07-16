import { FaLock, FaUnlock, FaEdit, FaCalendarAlt, FaHourglassHalf } from "react-icons/fa";
import { format, isPast, isBefore, addDays, differenceInCalendarDays } from "date-fns";
import { Customer } from "../customers/page";
import Image from "next/image";

type customerRowProps = {
  customer: Customer;
};

export default function CustomerRow({ customer }: customerRowProps) {
  const rentExpiry = new Date(customer.rentExpiry);
  const today = new Date();

  const getRentStatusColor = () => {
    if (isPast(rentExpiry)) return "text-red-600";
    if (isBefore(rentExpiry, addDays(today, 7))) return "text-yellow-500";
    return "text-green-600";
  };

  const getDaysLeft = () => {
    const days = differenceInCalendarDays(rentExpiry, today);
    if (days < 0) return { label: "Expired", color: "text-red-600" };
    if (days === 0) return { label: "Expires today", color: "text-yellow-600" };
    return { label: `${days} day${days > 1 ? "s" : ""} left`, color: "text-green-600" };
  };

  const daysLeft = getDaysLeft();

  return (
    <div className="bg-white shadow rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:shadow-md">
      {/* Left side - avatar and info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
          <Image
            src={customer.image || "/avatars/default.jpg"}
            alt={customer.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">{customer.name}</h3>
          <p className="text-sm text-gray-500">
            {customer.apartment} — Room {customer.roomNumber}
          </p>
          <p className="text-sm mt-1 flex items-center gap-1 text-gray-600">
            <FaCalendarAlt className="text-blue-500" />
            <span className={getRentStatusColor()}>
              {format(rentExpiry, "PPP")}
            </span>
          </p>
          <p className={`text-sm flex items-center gap-1 ${daysLeft.color}`}>
            <FaHourglassHalf />
            {daysLeft.label}
          </p>
        </div>
      </div>

      {/* Right side - actions */}
      <div className="flex flex-wrap items-center gap-2 ml-auto">
        <button
          className={`px-3 py-1.5 rounded-md text-sm font-medium text-white ${
            customer.smartLockStatus === "locked" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {customer.smartLockStatus === "locked" ? (
            <span className="flex items-center gap-1">
              <FaUnlock className="text-sm" />
              Unlock
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <FaLock className="text-sm" />
              Lock
            </span>
          )}
        </button>

        <button className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 font-medium">
          Extend Rent
        </button>

        <button className="p-2 text-gray-500 hover:text-black">
          <FaEdit className="text-lg" />
        </button>
      </div>
    </div>
  );
}
