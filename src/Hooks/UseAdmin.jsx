import React from 'react';
import UseAuth from '../FirebaseAuth/UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const userEmail = user?.email;

const {data: isAdmin, isLoading: isAdminLoading}=useQuery({

queryKey: [userEmail, 'isAdmin'],

enabled: !!userEmail && !loading,

queryFn :async()=>{
    const res = await axiosSecure.get(`/users/${userEmail}`);
    return res.data?.role === 'admin';
}




})

    return [isAdmin, isAdminLoading];
};

export default UseAdmin;