import { BiDollar } from "react-icons/bi";
import { FaBusAlt, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlane, FaTrain } from "react-icons/fa";
import { Link } from "react-router";


const TicketCard = ({ ticket }) => {
  // Determine the icon and primary color based on the transport type
  let TypeIcon = FaBusAlt;
  let typeColor = "text-green-600";

  if (ticket.type === "Train") {
    TypeIcon = FaTrain;
    typeColor = "text-red-500";
  } else if (ticket.type === "Airplane") {
    TypeIcon = FaPlane;
    typeColor = "text-blue-500";
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200">
      {/* Ticket Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>

      <div className="card-body p-5 space-y-3">
        {/* Title and Transport Type */}
        <h2 className="card-title text-2xl font-extrabold text-primary justify-between">
          {ticket.title}
          <span className={`badge badge-lg ${typeColor} font-bold`}>
            <TypeIcon className="mr-1" /> {ticket.type}
          </span>
        </h2>

        {/* Route and Location */}
        <div className="flex justify-between items-center text-lg font-semibold text-neutral">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-error" /> {ticket.from}
          </div>
          <span className="text-sm font-normal text-gray-500">→</span>
          <div className="flex items-center gap-1">
            {ticket.to} <FaMapMarkerAlt className="text-success" />
          </div>
        </div>

        <div className="divider my-0"></div>

        {/* Price and Quantity (Inventory) */}
        <div className="flex justify-between items-center text-sm font-medium">
          <p className="flex items-center gap-1 text-lg text-secondary">
            <BiDollar className="text-xl" /> Price:
            <span className="font-bold">{ticket.price}</span> / unit
          </p>
          <p className="text-sm text-gray-600">
            Available Seats:{" "}
            <span className="font-bold text-lg">{ticket.quantity}</span>
          </p>
        </div>

        {/* Departure Time */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <p className="flex items-center gap-1">
            <FaCalendarAlt /> Date:
            <span className="font-semibold">{ticket.date}</span>
          </p>
          <p className="flex items-center gap-1">
            <FaClock /> Time:
            <span className="font-semibold">{ticket.time}</span>
          </p>
        </div>

        {/* Perks/Amenities */}
        <div className="text-xs flex flex-wrap gap-2 pt-2">
          {ticket.perks &&
            Array.isArray(ticket.perks) &&
            ticket.perks.map((perk, index) => (
              <span key={index} className="badge badge-outline badge-sm">
                {perk}
              </span>
            ))}
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/ticket/${ticket._id}`} className="btn btn-primary w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
