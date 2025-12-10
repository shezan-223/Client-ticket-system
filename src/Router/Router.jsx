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
                        element :<AddTicket></AddTicket>
                    },
                    {
                        path:"myAddedTickets",
                        element : <MyAddedTickets></MyAddedTickets>
                    },
                
                ]
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