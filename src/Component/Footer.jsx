import React from "react";
import { FaBus, FaCcMastercard, FaCcVisa, FaEnvelope, FaFacebook, FaPhoneAlt, FaStripe } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-6">
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <span className="text-green-500">TicketBari</span>{" "}
              <FaBus className="text-green-500" />
            </div>
            <p className="text-sm leading-relaxed">
              Book bus, train, launch & flight tickets easily. We provide a
              seamless booking experience for your next journey across the
              country.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500 w-fit pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allTickets"
                  className="hover:text-green-500 transition-colors"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-green-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-green-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500 w-fit pb-1">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <span>support@ticketbari.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaFacebook className="text-green-500 text-lg" />
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-500"
                >
                  TicketBari Official
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500 w-fit pb-1">
              Payment Methods
            </h3>
            <p className="text-sm mb-4">Securely powered by:</p>
            <div className="flex gap-4 text-4xl">
              <FaStripe
                className="hover:text-white transition-colors cursor-pointer"
                title="Stripe"
              />
              <FaCcVisa
                className="hover:text-white transition-colors cursor-pointer"
                title="Visa"
              />
              <FaCcMastercard
                className="hover:text-white transition-colors cursor-pointer"
                title="Mastercard"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
          <p>
            &copy; 2025{" "}
            <span className="text-green-500 font-semibold">TicketBari</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
