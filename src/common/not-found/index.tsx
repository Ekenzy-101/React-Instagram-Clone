import { AppBar, Hidden, Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import DesktopViewHeader from "../header";
import Footer from "../footer";
import { TO_HOME_PAGE } from "../../utils/constants/routes";

const NotFoundPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Paper className={classes.root}>
      <Hidden xsDown>
        <AppBar position="sticky" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <DesktopViewHeader />
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
          <Link className={classes.link} to={TO_HOME_PAGE}>
            Go back to Instagram.
          </Link>
        </Typography>
      </div>

      <Footer />
    </Paper>
  );
};

export default NotFoundPage;
