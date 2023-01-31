import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  AuhtContextInterface,
  AuthContext,
} from "@src/components/hoc/AuthContext";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { userData } = useContext(AuthContext) as AuhtContextInterface;

  return userData?.is_superuser ? children : <Navigate to="/" />;
};

export default AdminRoute;
