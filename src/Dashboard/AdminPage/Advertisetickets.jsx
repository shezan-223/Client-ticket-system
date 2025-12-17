import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Advertisetickets = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approvedTicketsForAds"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      return res.data;
    },
  });

  const handleToggleAdvertise = async (id, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      const res = await axiosSecure.patch(`/tickets/advertise/${id}`, {
        isAdvertised: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `Ticket is now ${newStatus ? "Advertised" : "Unadvertised"}.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Limit Reached!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Advertise Approved Tickets
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white text-lg">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Advertise Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td>{ticket.title}</td>
                <td>${ticket.price}</td>
                <td>
                  <span
                    className={`badge ${
                      ticket.isAdvertised ? "badge-success" : "badge-ghost"
                    }`}
                  >
                    {ticket.isAdvertised ? "Live Ad" : "Not Advertised"}
                  </span>
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={ticket.isAdvertised || false}
                    onChange={() =>
                      handleToggleAdvertise(ticket._id, ticket.isAdvertised)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advertisetickets;
