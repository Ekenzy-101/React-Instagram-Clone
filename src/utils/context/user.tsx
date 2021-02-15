import { useQuery } from "@apollo/client";
import { Paper, Typography } from "@material-ui/core";
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

  if (error)
    return (
      <Paper
        square
        variant="outlined"
        style={{
          height: "100vh",
          width: "100vw",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography color="textPrimary" variant="h6">
          Something went wrong. Please try refreshing the page if error persists
        </Typography>
      </Paper>
    );

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
