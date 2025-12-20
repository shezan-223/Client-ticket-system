import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentModal = ({ booking }) => {
  // REMOVE the "if (!booking) return null" line from here!

  return (
    <dialog id="payment_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* Only show content if booking exists, but keep the dialog tag above always */}
        {booking ? (
          <>
            <h3 className="font-bold text-lg mb-4">Complete Payment</h3>
            <p className="text-sm">Ticket: <strong>{booking.title}</strong></p>
            <p className="text-sm mb-4">
              Total: <strong>${booking.totalPrice || (booking.price * booking.quantity)}</strong>
            </p>

            <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking} />
            </Elements>
          </>
        ) : (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default PaymentModal;