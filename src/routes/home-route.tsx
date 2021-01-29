import React from "react";
import { Route } from "react-router-dom";
import { useUser } from "../utils/context/user";
import { TO_HOME_PAGE } from "../utils/constants/routes";
import LoginPage from "../containers/login";
import HomePage from "../containers/home";

const HomeRoute: React.FC = () => {
  const { user } = useUser();
  return (
    <Route
      path={TO_HOME_PAGE}
      exact={true}
      component={user ? HomePage : LoginPage}
    />
  );
};

export default HomeRoute;
