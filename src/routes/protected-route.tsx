import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../utils/context/user";
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
  const { user } = useUserContext()!;

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect
            to={{
              pathname: TO_LOGIN_PAGE,
              state: props.location.pathname,
              search: `?redirect_to=${encodeURIComponent(
                props.location.pathname
              )}`,
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
