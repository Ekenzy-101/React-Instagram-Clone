import { Hidden, Avatar, Grid } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import { IG_MONOCHROME_LOGO_URL } from "../../utils/constants/url";
import {
  TO_HOME_PAGE,
  TO_LOGIN_PAGE,
  TO_SIGNUP_PAGE,
} from "../../utils/constants/routes";
import { useStyles } from "./styles";

const MobileViewHeader: React.FC = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { path, params } = useRouteMatch();

  return (
    <Hidden smUp>
      <Link
        to={{ pathname: TO_HOME_PAGE, state: { from: path, ...params } }}
        className={classes.navLink}
      >
        <Avatar
          src={IG_MONOCHROME_LOGO_URL}
          className={classes.brandLogo}
          variant="square"
        />
      </Link>
      <Grid container className={classes.gridIconContainer}>
        <Grid className={classes.gridItem} item>
          <Link
            to={{
              pathname: `${TO_LOGIN_PAGE}?next=${encodeURIComponent(pathname)}`,
              state: pathname,
            }}
            className={clsx(classes.signUpBtn, classes.navLink)}
          >
            Log In
          </Link>
        </Grid>
        <Grid className={classes.gridItem} item>
          <Link
            to={TO_SIGNUP_PAGE}
            className={clsx(classes.loginBtn, classes.navLink)}
          >
            Sign Up
          </Link>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default MobileViewHeader;
