import React, { useState } from "react";
import UseAuth from "../FirebaseAuth/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const BookingModal = ({ ticket, refetch }) => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
    setSubmitting(true); // 2. Turn on loading
    try {
        const bookingInfo = {
         // 1. Linking info
            ticketId: ticket._id,
            vendorEmail: ticket.vendorEmail,
            userEmail: user?.email,
            userName: user?.displayName,

            // 2. Display info (Copied from the ticket)
            title: ticket.title,
            image: ticket.image,
            from: ticket.from, // Ensure these fields exist in your ticket object
            to: ticket.to,
            date: ticket.date,
            time: ticket.time,
            price: ticket.price,

            // 3. User input
            quantity: parseInt(data.quantity),
            totalPrice: ticket.price * parseInt(data.quantity),
            
            // 4. Status
            status: "pending",
            bookingDate: new Date(),
        };

        const res = await axiosSecure.post("/bookings", bookingInfo);
        if (res.data.insertedId) {
          Swal.fire("Success!", "Your booking is pending.", "success");
          reset();
          refetch(); 
          document.getElementById("booking_modal").close();
        }
    } catch (error) {
        Swal.fire("Error", "Failed to process booking", error);
    } finally {
        setSubmitting(false); // 3. IMPORTANT: Turn off loading whether it succeeds or fails
    }
  };

  return (
    <dialog id="booking_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Book {ticket.title}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">Available: {ticket.quantity}</label>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="input input-bordered"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum 1 ticket" },
                max: {
                  value: ticket.quantity,
                  message: "Cannot exceed available tickets",
                },
              })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </div>
          <button 
            type="submit" 
            disabled={submitting} 
            className="btn btn-primary w-full"
          >
            {submitting ? (
              <>
                <span className="loading loading-spinner"></span> 
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
        <div className="modal-action">
          <button
            className="btn"
            disabled={submitting} // Disable close while submitting
            onClick={() => document.getElementById("booking_modal").close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
