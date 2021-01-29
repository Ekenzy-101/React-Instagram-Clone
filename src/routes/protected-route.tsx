import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../utils/context/user";
import { TO_LOGIN_PAGE } from "../utils/constants/routes";

interface Props {
  component: React.FC<{}>;
  AppProps?: object;
  path: string;
  exact: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: C,
  AppProps,
  ...rest
}) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          <Redirect
            to={{
              pathname: TO_LOGIN_PAGE,
              state: location.pathname,
              search: `?next=${encodeURIComponent(location.pathname)}`,
            }}
          />
        ) : (
          <C {...AppProps} />
        )
      }
    />
  );
};

export default ProtectedRoute;
