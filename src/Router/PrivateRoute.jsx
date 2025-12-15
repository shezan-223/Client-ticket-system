import React from 'react';
import UseAuth from '../FirebaseAuth/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading}=UseAuth()
    const location =useLocation()
    if (loading) {
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;