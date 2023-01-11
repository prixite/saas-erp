import React, { createContext, useEffect, useState } from "react";
import { useApiMeRetrieveQuery } from "@src/store/api";

export interface AuhtContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuhtContextInterface | null>(null);

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isFetching, isSuccess } = useApiMeRetrieveQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    isSuccess && setIsAuthenticated(true);
  }, [isFetching]);

  if (isFetching) return <p>Loading</p>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
