import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApiRefreshTokenCreateMutation } from "@src/store/api";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [refreshToken] = useApiRefreshTokenCreateMutation();
  const [loading, setIsloading] = useState(true);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
    refreshToken({
      refreshToken: { token_key: localStorage.getItem("token") || "" },
    })
      .unwrap()
      .then((resp) => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsloading(false));
  }, []);

  return !loading ? (
    isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <p>Loading</p>
  );
};

export default ProtectedRoute;
