import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.user.LoggedIn);

  if (isLoggedIn === false) return <>{children}</>;
  return <Navigate to="/" />;
};
export default ProtectedRoute;
