import React, { useState } from 'react';
import UseAuth from '../../FirebaseAuth/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BookingCard from './BookingCard';
import PaymentModal from './PaymentModal';

const MyBookedTickets = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [activeBooking, setActiveBooking] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run if email exists
  });
  const openStripeModal = (booking) => {
    setActiveBooking(booking);
    document.getElementById("payment_modal").showModal();
  }

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-3xl font-bold mb-8 text-center border-b-2 border-primary w-fit mx-auto pb-2">
        My Booked Tickets
      </h2>
      
      {bookings.length === 0 ? (
        <div className="text-center mt-20">
            <p className="text-xl text-gray-500">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} openStripeModal={openStripeModal} />
          ))}
        </div>
      )}
      <PaymentModal booking={activeBooking} />
    </div>
  );
};

export default MyBookedTickets;