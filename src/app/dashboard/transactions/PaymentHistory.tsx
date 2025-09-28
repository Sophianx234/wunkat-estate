import { daysLeft, formatNumber, formatToShortDate } from "@/lib/utils";
import { IHouse } from "@/models/House";
import { IPayment } from "@/models/Payment";
import { userDocumentType } from "@/models/User";
import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineHomeWork } from "react-icons/md";
import { roomType } from "../properties/[id]/page";

const payments = Array(6).fill({
  date: "21 Mar 2024",
  receipt: "943.574.4198",
  description: "Autem aliquid molestiae",
  amount: "$943.57",
});
export type transactionType = Omit<IPayment, "roomId" | "userId"> & {
  roomId: roomType & { houseId: IHouse };
  userId: userDocumentType;
}; 
export type paymentHistoryProps = {
  transactions?:transactionType[] ;
};

export default function PaymentHistory({transactions}:paymentHistoryProps) {
  return (
    <div className="col-span-2 flex flex-col gap-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Subscription</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{transactions&& daysLeft(transactions?.[0].expiresAt)>0?`${daysLeft(transactions?.[0].expiresAt)} Days left`:'Expired' } </p>
          </div>
           <HiOutlineClock className="text-yellow-500 w-8 h-8" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Properties</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">1 Property</p>
          </div>
          <MdOutlineHomeWork className="text-blue-600 w-8 h-8" />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 text-left">Date</th>
                <th className="text-left">Receipt No</th>
                <th className="text-left">Room</th>
                <th>House</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((payment:transactionType, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 text-xs sm:text-sm text-wrap">{formatToShortDate(payment?.createdAt) }</td>
                  <td className="text-xs sm:text-sm text-wrap">{payment.reference}</td>
                  <td className="text-xs sm:text-sm text-wrap ">{payment.roomId.name}</td>
                  <td className="">{payment.roomId.houseId.name}</td>
                  <td className=" ">₵{formatNumber(payment.amount)} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
