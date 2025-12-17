import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../FirebaseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ManageTickets = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, loading } = UseAuth();
  const shouldFetch = !!user?.email && !loading;

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allVendorTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin/all");
      return res.data;
    },
    enabled: shouldFetch,
  });

  const handleUpdateStatus = (id, newStatus) => {
    Swal.fire({
      title: `Confirm ${newStatus.toUpperCase()}?`,
      text: `You are about to ${newStatus} this ticket.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#3085d6" : "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, ${newStatus} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/tickets/status/${id}`, { status: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                `${newStatus.toUpperCase()}!`,
                `Ticket has been ${newStatus}.`,
                "success"
              );
              refetch();
            } else {
              Swal.fire(
                "Error!",
                `Failed to ${newStatus} the ticket.`,
                "error"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "An error occurred during update.", "error");
          });
      }
    });
  };
  if (isLoading) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
        Ticket Verification ({tickets.length} total)
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-2xl rounded-xl">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="text-base">
              <th>#</th>
              <th>Info</th>
              <th>Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket._id}
                className={
                  ticket.status === "pending" ? "hover:bg-warning/10" : ""
                }
              >
                <th>{index + 1}</th>
                {/* Ticket Info */}
                <td>
                  <div className="font-bold">{ticket.title}</div>
                  <div className="text-sm opacity-50">{ticket.type}</div>
                </td>
                {/* Details */}
                <td>
                  <p className="text-xs">
                    From: {ticket.from} - To: {ticket.to}
                  </p>
                  <p className="text-xs">
                    Price: ${ticket.price} | Qty: {ticket.quantity}
                  </p>
                  <p className="text-xs">Vendor: {ticket.vendorEmail}</p>
                </td>
                {/* Status */}
                <td>
                  <span
                    className={`badge badge-lg text-white ${
                      ticket.status === "approved"
                        ? "badge-success"
                        : ticket.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ticket.status.toUpperCase()}
                  </span>
                </td>
                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    {/* Approve Button */}
                    {ticket.status !== "approved" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(ticket._id, "approved")
                        }
                        className="btn btn-success btn-sm text-white text-xl"
                        title="Approve Ticket"
                      >Aprove
                        <FaCheckCircle className="text-lg" />
                      </button>
                    )}

                    {/* Reject Button */}
                    {ticket.status !== "rejected" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(ticket._id, "rejected")
                        }
                        className="btn btn-error btn-sm text-white text-xl"
                        title="Reject Ticket"
                      >Reject
                        <FaTimesCircle className="text-lg" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
