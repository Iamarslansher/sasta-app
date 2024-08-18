import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "../Components/Signup";
import Login from "../Components/Login";

import AdminDashboard from "../Components/AdminDashboard";
import ClientDashboard from "../Components/ClientDashboard";
import CardForm from "../Components/AdminDashboard/CardForm";
import UpdateProfile from "../Components/ClientDashboard/UpdateProfile";
import Feedback from "../Components/ClientDashboard/Feedback";
import Feedbacks from "../Components/AdminDashboard/Feedbacks";
import BuyProduct from "../Components/ClientDashboard/BuyProduct";
import Notification from "../Components/AdminDashboard/Notification";
import MyOrders from "../Components/ClientDashboard/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/clientdashboard",
    element: <ClientDashboard />,
  },
  {
    path: "/cardform",
    element: <CardForm />,
  },
  {
    path: "/updateprofile",
    element: <UpdateProfile />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/feedbacks",
    element: <Feedbacks />,
  },
  {
    path: "/buyingproduct",
    element: <BuyProduct />,
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
  {
    path: "/myorders",
    element: <MyOrders />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
