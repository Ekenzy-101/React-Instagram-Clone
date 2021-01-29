import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../utils/context/user";
import { TO_HOME_PAGE, TO_LOGIN_PAGE } from "../utils/constants/routes";
import { useMedia } from "react-use";

interface Props {
  component: React.FC<{}>;
  AppProps?: object;
  path: string;
  exact?: boolean;
  authenticated?: boolean;
}

const MobileRoute: React.FC<Props> = ({
  AppProps,
  authenticated,
  component: C,
  ...rest
}) => {
  const { user } = useUser();

  const mobileView = useMedia(`(max-width: 600px)`);

  return (
    <Route
      {...rest}
      render={({ location, match }) =>
        authenticated && !user ? (
          <Redirect
            to={{
              pathname: TO_LOGIN_PAGE,
              state: location.pathname,
              search: `?redirect_to=${encodeURIComponent(location.pathname)}`,
            }}
          />
        ) : !mobileView && match.params.id ? (
          <Redirect to={`/p/${match.params.id}/`} />
        ) : !mobileView && match.params.username ? (
          <Redirect to={`/${match.params.username}/`} />
        ) : !mobileView ? (
          <Redirect to={TO_HOME_PAGE} />
        ) : (
          <C {...AppProps} />
        )
      }
    />
  );
};

export default MobileRoute;
