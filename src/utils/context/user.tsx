import { ApolloQueryResult, useQuery } from "@apollo/client";
import React, { createContext, useContext } from "react";
import LoadingPage from "../../common/loading/page";
import { GET_AUTH_USER } from "../queries/user";
import { User } from "../types/user";

const UserContext = createContext<null | {
  user: null | User;
  setUser: (
    variables?: Partial<Record<string, any>> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}>(null);

export const UserProvider: React.FC = ({ children }) => {
  const { data, loading, refetch } = useQuery(GET_AUTH_USER);

  // JSX
  if (loading) return <LoadingPage />;

  return (
    <UserContext.Provider
      value={{ user: data ? (data.profile as User) : null, setUser: refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};
