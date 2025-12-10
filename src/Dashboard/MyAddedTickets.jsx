import React from 'react';
import UseAuth from '../FirebaseAuth/UseAuth';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const MyAddedTickets = () => {

    const {user} =UseAuth()
    const UseAxiosSecure =UseAxiosSecure()



    return (
        <div>
            
        </div>
    );
};

export default MyAddedTickets;