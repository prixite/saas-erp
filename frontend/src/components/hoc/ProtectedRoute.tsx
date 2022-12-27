import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@src/components/hoc/AuthContext";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
