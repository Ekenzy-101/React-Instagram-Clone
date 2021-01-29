import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useUser } from "../utils/context/user";
import { TO_HOME_PAGE } from "../utils/constants/routes";

interface Props {
  component: React.FC<{}>;
  AppProps?: object;
  path: string;
  exact: boolean;
}

const RedirectedRoute: React.FC<Props> = ({
  component: C,
  AppProps,
  path,
  exact,
  ...rest
}) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={() =>
        user ? <Redirect to={TO_HOME_PAGE} /> : <C {...AppProps} />
      }
    />
  );
};

export default RedirectedRoute;
