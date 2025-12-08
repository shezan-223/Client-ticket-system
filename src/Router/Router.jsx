import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout";
import Home from "../Home/Home";
import AuthLayout from "../FirebaseAuth/AuthLayout";
import Login from "../FirebaseAuth/Login";
import Register from "../FirebaseAuth/Register";
import Logout from "../FirebaseAuth/Logout";

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