import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  AuhtContextInterface,
  AuthContext,
} from "@src/components/hoc/AuthContext";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useContext(AuthContext) as AuhtContextInterface;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
