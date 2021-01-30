import { useQuery } from "@apollo/client";
import React, { createContext, useContext } from "react";
import LoadingPage from "../../common/loading/page";
import { GET_AUTH_USER } from "../queries/user";
import { User } from "../types/user";

const UserContext = createContext<
  | undefined
  | {
      user: null | User;
    }
>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  // Other Hooks
  const { data, loading, error } = useQuery(GET_AUTH_USER);

  // JSX
  if (loading) return <LoadingPage />;

  console.log(error);

  return (
    <UserContext.Provider
      value={{
        user: data ? (data.profile as User) : null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
