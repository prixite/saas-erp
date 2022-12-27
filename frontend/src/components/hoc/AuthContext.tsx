import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApiRefreshTokenCreateMutation } from "@src/store/api";

const AuthContext = createContext();

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [refreshToken] = useApiRefreshTokenCreateMutation();
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsloading(true);
      refreshToken({
        refreshToken: { token_key: localStorage.getItem("token") || "" },
      })
        .unwrap()
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => setIsloading(false));
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    !loading && (
      <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
    )
  );
};

export { AuthContext, AuthProvider };
