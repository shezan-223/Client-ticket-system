import axios from 'axios';
import React from 'react';

const axiosSecure =axios.create({
    baseURL:"http://localhost:3000"
})
axiosSecure.interceptors.request.use(
    function (config) {
        // 1. Get the token from local storage
        const token = localStorage.getItem('access-token');

        // 2. Attach the token if it exists
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


const UseAxiosSecure = () => {
    return axiosSecure
};

export default UseAxiosSecure;