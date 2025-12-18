import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import BookingModal from "./BookingModal";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const {
    data: ticket = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  // Countdown Logic
  useEffect(() => {
    if (!ticket.date || !ticket.time) return;

    const timer = setInterval(() => {
      const departureDateTime = new Date(`${ticket.date}T${ticket.time}`);
      const now = new Date();
      const difference = departureDateTime - now;

      if (difference <= 0) {
        setTimeLeft("Expired");
        setIsExpired(true);
        clearInterval(timer);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket]);

  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;

  const isBookingDisabled = isExpired || ticket.quantity <= 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card lg:card-side bg-base-100 shadow-xl border">
        <figure className="lg:w-1/2">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl font-bold">{ticket.title}</h2>
          <div className="badge badge-secondary">
            Departure: {ticket.date} at {ticket.time}
          </div>

          <div className="bg-neutral text-neutral-content p-4 rounded-lg my-4 text-center">
            <p className="text-sm uppercase tracking-widest">
              Countdown to Departure
            </p>
            <p className="text-2xl font-mono font-bold">{timeLeft}</p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Route:</strong> {ticket.route}
            </p>
            <p>
              <strong>Transport:</strong> {ticket.transportType}
            </p>
            <p>
              <strong>Available Quantity:</strong> {ticket.quantity}
            </p>
            <p className="text-2xl font-bold text-primary">${ticket.price}</p>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              disabled={isBookingDisabled}
              onClick={() =>
                document.getElementById("booking_modal").showModal()
              }
              className="btn btn-primary btn-lg w-full"
            >
              {ticket.quantity <= 0
                ? "Sold Out"
                : isExpired
                ? "Time Passed"
                : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <BookingModal ticket={ticket} refetch={refetch} />
    </div>
  );
};

export default TicketDetails;
