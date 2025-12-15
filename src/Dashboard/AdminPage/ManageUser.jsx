import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";import Swal from "sweetalert2";
import UseAuth from "../../FirebaseAuth/UseAuth";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const {user, loading} =UseAuth()
const shouldFetch = !!user?.email && !loading;
  // Fetch all users (protected by verifyAdmin middleware on the server)
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", user?.email],
    queryFn: async () => {
      // This endpoint is protected: /users is only accessible by Admin via verifyAdmin
      const res = await axiosSecure.get("/users");
      return res.data;
      
    },
    enabled: shouldFetch,
  });

  // --- Role Update Handler ---
  const handleUpdateRole = (email, newRole) => {
    Swal.fire({
      title: `Confirm Role Change`,
      text: `Do you want to change ${email} to ${newRole.toUpperCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change role!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${email}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Success!",
                `User role updated to ${newRole.toUpperCase()}.`,
                "success"
              );
              refetch(); // Refresh the table data
            } else {
              Swal.fire("Error!", "Failed to update user role.", "error");
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error!",
              `Role update failed: ${
                err.response?.data?.message || err.message
              }`,
              "error"
            );
          });
      }
    });
  };

  // --- Mark as Fraud Handler ---
  const handleMarkFraud = (email) => {
    Swal.fire({
      title: `Mark Vendor as Fraud?`,
      text: `This will hide all tickets and prevent future posting for ${email}.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Mark as Fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/fraud/${email}`)
          .then((res) => {
            if (res.data.userUpdateResult.modifiedCount > 0) {
              Swal.fire(
                "Fraud Locked!",
                `Vendor ${email} has been marked as fraud and tickets hidden.`,
                "success"
              );
              refetch(); // Refresh the table data
            } else {
              Swal.fire("Error!", "Failed to mark vendor as fraud.", "error");
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error!",
              `Fraud marking failed: ${
                err.response?.data?.message || err.message
              }`,
              "error"
            );
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Ensure we handle the case where the admin fails to load data (e.g., token expired or not admin)
  if (users.length === 0 && !isLoading) {
    return (
      <div className="text-center p-10 text-xl text-error">
        No users found or unauthorized access to user data.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Manage Users ({users.length})
      </h2>
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  {/* Role/Status Badge Display */}
                  <span
                    className={`badge ${
                      user.isFraud
                        ? "badge-error"
                        : user.role === "admin"
                        ? "badge-secondary"
                        : user.role === "vendor"
                        ? "badge-accent"
                        : "badge-primary"
                    } text-white`}
                  >
                    {user.isFraud ? "FRAUD" : user.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Make Admin Button */}
                    {user.role !== "admin" && !user.isFraud && (
                      <button
                        onClick={() => handleUpdateRole(user.email, "admin")}
                        className="btn btn-sm btn-secondary"
                      >
                        Make Admin
                      </button>
                    )}

                    {/* Make Vendor Button */}
                    {user.role !== "vendor" && !user.isFraud && (
                      <button
                        onClick={() => handleUpdateRole(user.email, "vendor")}
                        className="btn btn-sm btn-accent"
                      >
                        Make Vendor
                      </button>
                    )}

                    {/* Mark as Fraud Button (Only for Vendors) */}
                    {user.role === "vendor" && !user.isFraud && (
                      <button
                        onClick={() => handleMarkFraud(user.email)}
                        className="btn btn-sm btn-error"
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
