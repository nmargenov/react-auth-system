import { useContext } from "react";
import { UserContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

export const MustBeGuestGuard = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};
