import React from 'react';
import UseAuth from '../FirebaseAuth/UseAuth';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';

const Profile = () => {

const {user,loading}=UseAuth;
const axiosSecure =UseAxiosSecure()




    return (
        <div>
            
        </div>
    );
};

export default Profile;