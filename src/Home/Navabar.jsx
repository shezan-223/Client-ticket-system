import React from 'react';
import { FaBus } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import UseAuth from '../FirebaseAuth/UseAuth';

const Navabar = () => {
  const { user, logOut } = UseAuth();
  console.log(user);
  

  const handleLogOut = () => {
    logOut()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-md">

      {/* Left: Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl text-green-700 font-bold">
          TicketBari <FaBus />
        </a>
      </div>

      {/* Right: Desktop Menu */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/allTickets">All Tickets</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
       { user && <>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        
       </> }
        </ul>
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden lg:flex gap-2">

        {!user && (
          <>
            <Link to="/login">
              <button className="btn btn-outline">Login</button>
            </Link>

            <Link to="/register">
              <button className="btn btn-outline">Register</button>
            </Link>
          </>
        )}

        {user && (
          <button onClick={handleLogOut} className="btn btn-error text-white">
            Logout
          </button>
        )}

      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex-none dropdown dropdown-end">
  {/* Changed label to button for better focus handling */}
  <button tabIndex={0} role="button" className="btn btn-ghost btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>

  {/* Added z-[50] to ensure it stays above the Banner/Slider */}
  <ul tabIndex={0}
    className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">

    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allTickets">All Tickets</NavLink></li>
    {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    <li><NavLink to="/profile">Profile</NavLink></li>

    {/* Mobile auth conditions */}
    {!user ? (
      <>
        <div className="divider my-1"></div>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </>
    ) : (
      <li><button onClick={handleLogOut} className="text-red-500 font-bold">Logout</button></li>
    )}
  </ul>
</div>

    </div>
  );
};

export default Navabar;