import React from "react";
import { IoTicket } from "react-icons/io5";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import UseAuth from "../FirebaseAuth/UseAuth";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import UseAdmin from "../Hooks/UseAdmin";
import UseVendor from "../Hooks/Usevendor";
import {
  FaBullhorn,
  FaChartLine,
  FaClipboardList,
  FaFileInvoice,
  FaHistory,
  FaHome,
  FaCog,
  FaTicketAlt,
} from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";

const Dashboard = () => {
  const { user } = UseAuth();
  const location = useLocation();
  const [isAdmin, isAdminLoading] = UseAdmin();
  const [isVendor, isVendorLoading] = UseVendor();

  // Helper function for active link styling
  const activeClass = "bg-green-400 text-white font-bold rounded-lg";
  const normalClass = "hover:bg-gray-200 rounded-lg transition-all";

  if (isAdminLoading || isVendorLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-white shadow-sm px-6">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <div className="flex-1 px-4 font-bold text-xl text-gray-700">
              {isAdmin
                ? "Admin Panel"
                : isVendor
                ? "Vendor Dashboard"
                : "User Dashboard"}
              <span className="text-sm font-normal ml-2 opacity-60">
                | {user?.displayName}
              </span>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="p-8 bg-gray-50 min-h-screen">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col w-64 bg-base-200 text-base-content border-r">
            <div className="p-6 text-2xl font-bold text-green-700 flex items-center gap-2">
              TicketBari <FaTicketAlt />
            </div>

            <ul className="menu p-4 w-full space-y-2">
              {/* --- ADMIN LINKS --- */}
              {isAdmin && (
                <>
                  <div className="text-xs font-bold text-gray-400 uppercase mt-4 mb-2 ml-4">
                    Admin Menu
                  </div>
                  <li>
                    <NavLink
                      to="/dashboard/manageusers"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <HiUserGroup size={20} /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/managetickets"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <FaClipboardList size={20} /> Manage Tickets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/advertiseTickets"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <FaBullhorn size={20} /> Advertise Tickets
                    </NavLink>
                  </li>
                </>
              )}

              {/* --- VENDOR LINKS --- */}
              {isVendor && (
                <>
                  <div className="text-xs font-bold text-gray-400 uppercase mt-4 mb-2 ml-4">
                    Vendor Menu
                  </div>
                  <li>
                    <NavLink
                      to="/dashboard/revenue"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <FaChartLine size={20} /> Revenue Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addTicket"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <IoTicket size={20} /> Add New Tickets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/myAddedTickets"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <MdOutlineFormatListBulleted size={20} /> My Added Tickets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/requestedBookings"
                      className={({ isActive }) =>
                        isActive ? activeClass : normalClass
                      }
                    >
                      <FaCodePullRequest size={20} /> Requested Bookings
                    </NavLink>
                  </li>
                </>
              )}

              {/* --- COMMON USER LINKS --- */}
              <div className="text-xs font-bold text-gray-400 uppercase mt-4 mb-2 ml-4">
                General
              </div>
              <li>
                <NavLink
                  to="/dashboard/myBookedTickets"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaFileInvoice size={20} /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <FaHistory size={20} /> Payment History
                </NavLink>
              </li>

              <div className="divider opacity-50"></div>

              {/* Return Home */}
              <li>
                <Link to="/" className={normalClass}>
                  <FaHome size={20} /> Return to Home
                </Link>
              </li>
              <li>
                <button className={normalClass}>
                  <FaCog size={20} /> Settings
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
