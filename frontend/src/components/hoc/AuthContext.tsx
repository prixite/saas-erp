import React, { createContext, useEffect, useState } from "react";
import { useGetUserQuery } from "@src/store/reducers/employees-api";
import { User } from "@src/helpers/interfaces/employees-modal";

export interface AuhtContextInterface {
  isAuthenticated: boolean;
  userData: User | undefined;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuhtContextInterface | null>(null);

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { isFetching, isSuccess, data: userData } = useGetUserQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    isSuccess && setIsAuthenticated(true);
  }, [isFetching]);

  if (isFetching) return <p>Loading</p>;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
