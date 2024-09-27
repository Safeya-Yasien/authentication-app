import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const accessToken = Cookies.get("accessToken");

  return accessToken ? children : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
