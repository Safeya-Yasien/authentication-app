import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login, Signup } from "@/pages/auth";
import { MainLayout } from "@/layouts";
import { Error, Home } from "@/pages";
import { Dashboard } from "@/pages/dashboard";
import Cookies from "js-cookie";
import { RequireAuth } from "@/components";

const accessToken = Cookies.get("accessToken");

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "auth",
        children: [
          {
            path: "signup",
            element: accessToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup />
            ),
          },
          {
            path: "login",
            element: accessToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            ),
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
