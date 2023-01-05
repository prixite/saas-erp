import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@src/components/hoc/AuthContext";

type Props = {
  children: React.ReactNode;
};

const WthAuth = ({ children }: Props) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default WthAuth;
