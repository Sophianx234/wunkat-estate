"use client";

import { daysLeft, formatNumber, formatToShortDate } from "@/lib/utils";
import { IHouse } from "@/models/House";
import { IPayment } from "@/models/Payment";
import { userDocumentType } from "@/models/User";
import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineHomeWork } from "react-icons/md";
import { roomType } from "../properties/[id]/page";

export type transactionType = Omit<IPayment, "roomId" | "userId"> & {
  roomId: roomType & { houseId: IHouse };
  userId: userDocumentType;
};

export type paymentHistoryProps = {
  transactions?: transactionType[];
};

export default function PaymentHistory({ transactions }: paymentHistoryProps) {
  const subscriptionStatus =
    transactions && daysLeft(transactions?.[0]?.expiresAt) > 0
      ? `${daysLeft(transactions?.[0]?.expiresAt)} Days Left`
      : "Expired";

  return (
    <div className="col-span-2 flex flex-col gap-8">
      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Subscription Card */}
        <div className="relative rounded-lg p-5 shadow  transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Subscription</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {subscriptionStatus}
              </p>
            </div>
            <div className="bg-gray-200 rounded-full  p-3">
              <HiOutlineClock className=" w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Properties Card */}
        <div className="relative  rounded-lg p-5 shadow-sm  transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Properties</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {transactions?.length ? "1 Property" : "—"}
              </p>
            </div>
            <div className="bg-gray-200 rounded-full  p-3">
              <MdOutlineHomeWork className=" w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Payment History Table ===== */}
      <div className="rounded-2xl  transition-all ">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text font-semibold text-gray-800">
            Payment History
          </h2>
          {transactions && transactions.length > 0 && (
            <span className="text-sm text-gray-500">
              {transactions.length} {transactions.length === 1 ? "record" : "records"}
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 font-medium border-b">
                <th className="py-3 px-4 text-left">Date</th>
                <th className="px-4 text-left">Receipt No</th>
                <th className="px-4 text-left">Room</th>
                <th className="px-4 text-left">House</th>
                <th className="px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((payment: transactionType, index) => (
                <tr
                  key={index}
                  className={`border-b last:border-0 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-gray-100/50 transition`}
                >
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    {formatToShortDate(payment?.createdAt)}
                  </td>
                  <td className="px-4 text-gray-700">{payment.reference}</td>
                  <td className="px-4 text-gray-700">{payment.roomId.name}</td>
                  <td className="px-4 text-gray-700">
                    {payment.roomId.houseId.name}
                  </td>
                  <td className="px-4 text-right font-medium text-gray-900">
                    ₵{formatNumber(payment.amount)}
                  </td>
                </tr>
              ))}

              {!transactions?.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-500 text-sm"
                  >
                    No payment history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
