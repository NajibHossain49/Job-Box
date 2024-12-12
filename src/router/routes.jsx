import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Registration from "../Pages/Register/Registration";
import Signin from "../Pages/Signin/Signin";
import JobDetails from "../Pages/jobDetails";
import PrivateRoute from "./PrivateRoute";
import MyApplications from "../Pages/MyApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/job-details/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/MyApplications",
        element: (
          <PrivateRoute>
            <MyApplications/>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
