import React, { useState } from "react";
import UseAuth from "../FirebaseAuth/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyAddedTickets = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [open, setOpen] = useState(false);

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["myTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  const handleDelete = async (ticketID) => {
    console.log(ticketID);

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/tickets/${ticketID}`);
        Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
        queryClient.invalidateQueries(["myTickets", user.email]);
      } catch (err) {
        console.log(err);
        Swal.fire("Error!", "Failed to delete ticket.", "error");
      }
    }
  };

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      return axiosSecure.put(`/tickets/${id}`, updatedData);
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Ticket updated successfully", "success");
      queryClient.invalidateQueries(["myTickets", user.email]);
      setOpen(false);
    },
  });
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My Added Tickets</h1>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-48 object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-sm font-semibold rounded-full 
                    ${
                      ticket.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : ticket.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Route:</span> {ticket.from} →{" "}
                  {ticket.to}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Type:</span> {ticket.type}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Price:</span> {ticket.price} ×{" "}
                  {ticket.quantity}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Total:</span> {ticket.total}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {ticket.date} | {ticket.time}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setOpen(true);
                    }}
                    className="flex-1 btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="flex-1 btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
