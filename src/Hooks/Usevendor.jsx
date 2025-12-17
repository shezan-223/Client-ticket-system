// src/Hooks/useVendor.jsx

import { useQuery } from "@tanstack/react-query";
import UseAuth from "../FirebaseAuth/UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";



const UseVendor = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const userEmail = user?.email;

    // Use query to fetch the user's current role from the server
    const { data: isVendor, isLoading: isVendorLoading } = useQuery({
        queryKey: [userEmail, 'isVendor'],
        
        // This query runs ONLY when the user is loaded, not loading, and we have an email
        enabled: !!userEmail && !loading, 
        
        queryFn: async () => {
            // Fetch the user object (which includes the role)
            const res = await axiosSecure.get(`/users/${userEmail}`);
            // Check if the role is 'vendor'
            return res.data?.role === 'vendor'; 
        },
    });

    return [isVendor, isVendorLoading];
};

export default UseVendor;