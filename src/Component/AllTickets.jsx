import React from "react";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "./TicketCard";

const AllTickets = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: approvedTickets = [], isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/all");
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center my-8">All Available Tickets</h1>
      {/* Implement your grid layout here, mapping over approvedTickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedTickets.map((ticket) => (
          // Render your Ticket Card component here
          // Ensure the card has all required fields: Image, Title, Price, Quantity, From->To, Transport type, Perks, Date/Time, and "See details" button.
          <div key={ticket._id} className="card shadow-lg">
            <TicketCard ticket={ticket}></TicketCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
