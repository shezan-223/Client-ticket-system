import React from "react";
import UseAuth from "../../FirebaseAuth/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Transaction History
        </h2>
        <p className="text-sm text-gray-500">
          View all your successful ticket purchases
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>#</th>
              <th>Ticket Title</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td className="font-semibold">{payment.ticketTitle}</td>
                  <td className="font-mono text-sm text-blue-600">
                    {payment.transactionId}
                  </td>
                  <td className="text-green-600 font-bold">
                    ${payment.amount}
                  </td>
                  <td>
                    {new Date(payment.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
