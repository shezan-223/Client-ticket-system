import React from "react";
import UseAuth from "../FirebaseAuth/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const userEmail = user?.email;
  const hasToken = localStorage.getItem('access-token');

  const {
    data: dbUser = {},
    isLoading: isDbLoading,
    error: dbError,
  } = useQuery({
    queryKey: ["dbUser", userEmail],
    enabled: !!userEmail && !loading && !!hasToken, 
    // && !!hasToken
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${userEmail}`);
      return res.data;
    },
  });
  if (loading || isDbLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="text-red-500 text-center p-8">
        Error loading profile data: {dbError.message}
      </div>
    );
  }

  // 3. Combine Data for Display
  // Prioritize Firebase data for Name/Photo (as they are the freshest) and MongoDB for Role/Status.
  const finalUser = {
    name: user?.displayName || dbUser.name || "N/A", // If Firebase name is null, fall back to DB name
    email: userEmail,
    photo:
      user?.photoURL ||
      dbUser.photo ||
      "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    role: dbUser.role || "user",
    createdAt: dbUser.createdAt
      ? new Date(dbUser.createdAt).toLocaleDateString()
      : "N/A",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        My Profile
      </h1>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={finalUser.photo}
                  alt={`${finalUser.name}'s Profile`}
                />
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-4xl font-extrabold">{finalUser.name}</h2>
              <p className="text-lg text-gray-500">{finalUser.email}</p>

              {/* Role Badge */}
              <div className="flex items-center justify-center md:justify-start pt-2">
                <div
                  className={`badge ${
                    finalUser.role === "admin"
                      ? "badge-secondary"
                      : "badge-primary"
                  } text-white font-semibold`}
                >
                  Role: {finalUser.role.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="divider">Account Details</div>

          {/* Detailed Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-lg">
              <strong>Email:</strong> {finalUser.email}
            </p>
            <p className="text-lg">
              <strong>Member Since:</strong> {finalUser.createdAt}
            </p>
          </div>

          {/* Edit Button (Future feature) */}
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-warning">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
