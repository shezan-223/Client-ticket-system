import React from 'react';
import UseAuth from '../FirebaseAuth/UseAuth';
import UseAdmin from '../Hooks/UseAdmin';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
    const {loading,user} =UseAuth()
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return (
            <div className="flex justify-center items-center h-full min-h-[400px]">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }


    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;