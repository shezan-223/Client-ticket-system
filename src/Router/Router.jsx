import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout";
import Home from "../Home/Home";
import AuthLayout from "../FirebaseAuth/AuthLayout";
import Login from "../FirebaseAuth/Login";
import Register from "../FirebaseAuth/Register";
import Logout from "../FirebaseAuth/Logout";
import Dashboard from "../Dashboard/Dashboard";
import AddTicket from "../Dashboard/VendorPage/AddTicket";
import MyAddedTickets from "../Dashboard/MyAddedTickets";
import Profile from "../Component/Profile";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Dashboard/AdminPage/ManageUser";


export const router = createBrowserRouter([
    {
        path :"/",
        element : <RootLayout></RootLayout>,
        children :[
            {
                index :true ,
                element :<Home></Home>,
            },
            
            {
                path:"/dashboard",
                element :<Dashboard></Dashboard>,
                children :[
                    {
                        path:"addTicket",
                        element : <PrivateRoute>
                            <AddTicket></AddTicket>
                        </PrivateRoute>
                    },
                    {
                        path:"myAddedTickets",
                        element : <PrivateRoute>
                            <MyAddedTickets></MyAddedTickets>
                        </PrivateRoute>
                    },
                    {
                        path:"manageusers",
                        element :<ManageUsers></ManageUsers>
                    }
                
                ]
            },
            {
                path:"/profile",
                element :<Profile></Profile>        
            },






            {
                element : <AuthLayout></AuthLayout>,
                children :[
                    {
                        path:'/login',
                        element :<Login></Login>
                    },
                    {
                        path :"/register",
                       element: <Register></Register>,
                    },
                    {
                        path :"/logout",
                       element: <Logout></Logout>,
                    },
                ]
            }





        ]
    }
])