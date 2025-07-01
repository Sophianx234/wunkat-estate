import { Wallet } from "lucide-react";
import { MdOutlineHomeWork } from "react-icons/md";

const payments = Array(6).fill({
  date: "21 Mar 2024",
  receipt: "943.574.4198",
  description: "Autem aliquid molestiae",
  amount: "$943.57",
});

export default function PaymentHistory() {
  return (
    <div className="col-span-2 flex flex-col gap-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Pay</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">$5500.65</p>
          </div>
          <Wallet className="text-green-600 w-8 h-8" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Properties</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">2 Properties</p>
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
                <th className="py-2">Date</th>
                <th>Receipt No</th>
                <th>Description</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 text-xs sm:text-sm">{payment.date}</td>
                  <td className="text-xs sm:text-sm text-wrap">{payment.receipt}</td>
                  <td className="text-xs sm:text-sm px-3">{payment.description}</td>
                  <td className="text-right ">{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
