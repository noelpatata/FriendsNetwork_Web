import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { usertoken } = useAuth();

  if (!usertoken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
