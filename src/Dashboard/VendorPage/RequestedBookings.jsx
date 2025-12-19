import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../FirebaseAuth/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";




const RequestedBookings = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["vendor-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor-bookings/${user?.email}`);
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/bookings/status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", `Booking ${newStatus}`, "success");
      refetch(); // Refresh the list
    }
  };

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">User Booking Requests</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>User Email</th>
              <th>Ticket Title</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.userEmail}</td>
                <td>{request.title}</td>
                <td>{request.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "accepted"
                        ? "badge-success"
                        : request.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "accepted")
                        }
                        className="btn btn-xs btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "rejected")
                        }
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
