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
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import AllTickets from "../Component/AllTickets";
import ManageTickets from "../Dashboard/AdminPage/ManageTickets";
import Advertisetickets from "../Dashboard/AdminPage/Advertisetickets";
import TicketDetails from "../Component/TicketDetails";
import MyBookedTickets from "../Dashboard/UserPage/MyBookedTickets";
import RequestedBookings from "../Dashboard/VendorPage/RequestedBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path:"/ticket/:id",
        element :<PrivateRoute>
          <TicketDetails></TicketDetails>
        </PrivateRoute>

      },


      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "addTicket",
            element: (
              <VendorRoute>
                <AddTicket></AddTicket>
              </VendorRoute>
            ),
          },
          {
            path:"myBookedTickets",
            element :<PrivateRoute>
              <MyBookedTickets></MyBookedTickets>
            </PrivateRoute>
          },
          {
            path: "myAddedTickets",
            element: (
              <VendorRoute>
                <MyAddedTickets></MyAddedTickets>
              </VendorRoute>
            ),
          },
        {
          path :"requestedBookings",
          element :
          <VendorRoute>

            <RequestedBookings></RequestedBookings>
          </VendorRoute>

        },
          {
            path: "manageusers",
            element: (
              <AdminRoute>
                <ManageUsers></ManageUsers>
              </AdminRoute>
            ),
          },
          {
            path :"advertiseTickets",
            element :<AdminRoute>
              <Advertisetickets></Advertisetickets>
            </AdminRoute>
          },
          {
            path:"managetickets",
            element :<AdminRoute>
              <ManageTickets></ManageTickets>
            </AdminRoute>
          }
        ],
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path:"/allTickets",
        element :<AllTickets></AllTickets>
      },

      {
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/login",
            element: <Login></Login>,
          },
          {
            path: "/register",
            element: <Register></Register>,
          },
          {
            path: "/logout",
            element: <Logout></Logout>,
          },
        ],
      },
    ],
  },
]);
