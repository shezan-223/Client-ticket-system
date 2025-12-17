import React from "react";
import { FaBus, FaCheckCircle, FaClock, FaPlane, FaShip, FaTrain } from "react-icons/fa";
import { useNavigate } from "react-router";



const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  // Helper to get transport icon
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus />;
      case "train":
        return <FaTrain />;
      case "airplane":
        return <FaPlane />;
      case "launch":
        return <FaShip />;
      default:
        return <FaBus />;
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image Section with Type Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-primary font-bold shadow-sm">
          {getTransportIcon(ticket.type)}
          <span className="text-xs uppercase tracking-wider">
            {ticket.type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <h3
          className="text-xl font-bold text-gray-800 mb-2 truncate"
          title={ticket.title}
        >
          {ticket.title}
        </h3>

        {/* Route Info */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-4">
          <div className="text-center">
            <p className="text-[10px] uppercase text-gray-400 font-bold">
              From
            </p>
            <p className="text-sm font-bold text-gray-700">{ticket.from}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-2px bg-gray-300 relative">
              <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase text-gray-400 font-bold">To</p>
            <p className="text-sm font-bold text-gray-700">{ticket.to}</p>
          </div>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ticket.perks?.slice(0, 3).map((perk, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 text-[10px] font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md"
            >
              <FaCheckCircle className="text-[8px]" /> {perk}
            </span>
          ))}
        </div>

        {/* Pricing & Time */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-2xl font-black text-primary">
                ${ticket.price}
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                Per Unit
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-600 flex items-center gap-1 justify-end">
                <FaClock className="text-xs text-primary" /> {ticket.time}
              </p>
              <p className="text-xs text-gray-400">{ticket.date}</p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/ticket/${ticket._id}`)}
            className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
