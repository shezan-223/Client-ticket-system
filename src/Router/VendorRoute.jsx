import React from "react";
import UseAuth from "../FirebaseAuth/UseAuth";
import UseVendor from "../Hooks/Usevendor";
import { Navigate, useLocation } from "react-router";

const VendorRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isVendor, isVendorLoading] = UseVendor(); // ⬅️ Get vendor status
  const location = useLocation();
  if (loading || isVendorLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }


if (user && isVendor) {
        return children;
    }




  return <Navigate to="/" state={{ from: location }} replace />;
};

export default VendorRoute;
