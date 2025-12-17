import React from "react";
import { Outlet } from "react-router";
import Navabar from "./Navabar";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TicketCard from "./TicketCard";

const Home = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: advertisedTickets = [], isLoading: adsLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/advertised");
      return res.data;
    },
  });

  const { data: latestTickets = [], isLoading: latestLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/latest");
      return res.data;
    },
  });
  if (adsLoading || latestLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <div>
      {/* Hero Banner Section */}
    

      <div className="max-w-7xl mx-auto px-4">
        {/* Advertisement Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-primary w-fit mx-auto pb-2">
            Featured Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advertisedTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </section>

        {/* Latest Tickets Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-secondary w-fit mx-auto pb-2">
            Latest Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </section>

        {/* Extra Section: Why Choose Us */}
        <section className="my-20 bg-base-200 p-10 rounded-3xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Why Choose TicketBari?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8">
              <div>
                <h3 className="font-bold text-xl">Instant Booking</h3>
                <p>Get your tickets in seconds with our optimized system.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl">Secure Payment</h3>
                <p>Integrated with Stripe for 100% safe transactions.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl">24/7 Support</h3>
                <p>Our team is here to help you anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
