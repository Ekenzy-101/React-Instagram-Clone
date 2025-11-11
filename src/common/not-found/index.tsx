import { AppBar, Hidden, Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { useStyles } from "./styles";
import DesktopViewHeader from "../header";
import Footer from "../footer";
import { TO_HOME_PAGE } from "../../utils/constants/routes";
import { useUser } from "../../utils/context/user";
import MobileViewHeader from "../header/mobile-view";
import { useTitle } from "react-use";

const NotFoundPage: React.FC = () => {
  const { user } = useUser();

  // Other Hooks
  const classes = useStyles();
  const { path, params } = useRouteMatch();
  useTitle("Page Not Found - Kenzygram");

  // JSX
  return (
    <>
      <Paper className={classes.root}>
        <Hidden xsDown={user ? true : false}>
          <AppBar position="sticky" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <DesktopViewHeader />
              {user ? null : <MobileViewHeader />}
            </Toolbar>
          </AppBar>
        </Hidden>

        <div className={classes.wrapper}>
          <Typography className={classes.title} variant="h5">
            Sorry, this page isn't available.
          </Typography>
          <Typography className={classes.subTitle}>
            The link you followed may be broken, or the page may have been
            removed. {"  "}
            <Link
              className={classes.link}
              to={{ pathname: TO_HOME_PAGE, state: { from: path, ...params } }}
            >
              Go back to Kenzygram.
            </Link>
          </Typography>
        </div>

        <Footer />
      </Paper>
    </>
  );
};

export default NotFoundPage;
