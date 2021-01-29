import { useMutation } from "@apollo/client";
import React, { createContext, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { TOGGLE_FOLLOW } from "../mutations/user";
import { TO_LOGIN_PAGE } from "../constants/routes";
import { useUser } from "./user";
import { debug } from "../services/debugService";
import { updateAuthUserFollowers } from "../helpers/user";
import { User } from "../types/user";

const FollowContext = createContext<
  | { handleToggleFollow: (profile: User) => void; submitted: boolean }
  | undefined
>(undefined);

export const FollowProvider: React.FC = ({ children }) => {
  // Other Hooks
  const [toggleFollow, { loading }] = useMutation(TOGGLE_FOLLOW);
  const { user } = useUser();
  const history = useHistory();
  const { pathname } = useLocation();

  // Event Handlers
  const handleToggleFollow = async (profile: User) => {
    try {
      await toggleFollow({
        variables: { id: profile?.id },
        update(cache) {
          updateAuthUserFollowers(cache, user, profile);
        },
      });
    } catch (error) {
      debug.error(error?.message);
      if (error?.message.includes("Unauthorized")) {
        history.push(
          `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
          pathname
        );
      } else {
        toast(error?.message);
      }
    }
  };

  // JSX
  return (
    <FollowContext.Provider
      value={{
        handleToggleFollow,
        submitted: loading,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
