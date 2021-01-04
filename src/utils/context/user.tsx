import React, { createContext, useContext, useState } from "react";
import { User } from "../types/user";

const UserContext = createContext<
  | undefined
  | {
      user: null | User;
      setUser: (user: User | null) => void;
    }
>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);

  const handleSetUser = (user: null | User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  return context;
};
