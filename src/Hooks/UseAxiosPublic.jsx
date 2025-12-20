import axios from "axios";

const axiosPublic = axios.create({
    // It will use the Vercel link if live, or localhost if you are working at home
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    withCredentials: true
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;