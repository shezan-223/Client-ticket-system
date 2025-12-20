import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../FirebaseAuth/UseAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false); // Added processing state

  const totalPrice = booking.price * booking.quantity;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        // Prepare data for the backend
        const paymentInfo = {
          transactionId: paymentIntent.id,
          amount: totalPrice,
          bookingId: booking._id,
          ticketId: booking.ticketId, // REQUIRED to reduce quantity
          quantity: booking.quantity, // REQUIRED to reduce quantity
          ticketTitle: booking.title,
          date: new Date(),
          userEmail: user?.email,
        };

        try {
          const res = await axiosSecure.post("/payments", paymentInfo);
          if (res.data.paymentResult.insertedId) {
            Swal.fire(
              "Success",
              `Payment successful! ID: ${paymentIntent.id}`,
              "success"
            );

            // Close the DaisyUI Modal
            document.getElementById("payment_modal").close();

            // Use this instead of reload if you want a smoother experience
            window.location.reload();
          }
        } catch (err) {
          console.error("Payment Save Error:", err);
          Swal.fire(
            "Error",
            "Payment succeeded but failed to update database.",
            "error"
          );
        }
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="border p-4 rounded-lg bg-white mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay $${totalPrice}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
