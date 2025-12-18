import React, { useEffect, useState } from "react";

const BookingCard = ({ booking }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      // Create a date object from the ticket's departure date and time
      const departure = new Date(`${booking.date}T${booking.time}`);
      const now = new Date();
      const diff = departure - now;

      if (diff <= 0) {
        setTimeLeft("Expired/Departed");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [booking.date, booking.time]);

  // Dynamic Status Colors
  const statusClass = {
    pending: "badge-warning",
    accepted: "badge-success",
    rejected: "badge-error",
    paid: "badge-info",
  };

  return (
    <div className="card bg-base-100 shadow-2xl border border-gray-100 transition-transform hover:scale-[1.02]">
      <figure className="relative">
        <img
          src={booking.image}
          alt={booking.title}
          className="h-52 w-full object-cover"
        />
        <div
          className={`absolute top-4 right-4 badge ${
            statusClass[booking.status]
          } p-3 font-semibold uppercase text-xs`}
        >
          {booking.status}
        </div>
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-xl font-bold text-gray-800">
          {booking.title}
        </h2>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 my-1">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {booking.from}
          </span>
          <span>→</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
            {booking.to}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-700 mt-2">
          <p>
            <strong>Quantity:</strong> {booking.quantity}
          </p>
          <p>
            <strong>Total Price:</strong>{" "}
            <span className="text-primary font-bold text-lg">
              ${booking.totalPrice || booking.price * booking.quantity}
            </span>
          </p>
          <p>
            <strong>Departure:</strong> {booking.date} at {booking.time}
          </p>
        </div>

        {/* Countdown Box */}
        <div className="bg-neutral text-neutral-content p-3 rounded-lg text-center mt-4">
          <p className="text-[10px] uppercase tracking-tighter opacity-70">
            Countdown to Departure
          </p>
          <p className="font-mono text-lg font-bold">{timeLeft}</p>
        </div>

        {/* Action Button */}
        {booking.status === "accepted" && (
          <div className="card-actions mt-4">
            <button className="btn btn-success btn-sm w-full text-white">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
