import { AppBar, Hidden, Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

import { useStyles } from "./styles";

const LoginFooter: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Hidden smUp>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.textGroup}>
            <Typography
              className={classes.text}
              variant="caption"
              color="textSecondary"
            >
              from
            </Typography>
            <Typography
              className={clsx(classes.text, classes.mainText)}
              color="textPrimary"
            >
              FACEBOOK
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default LoginFooter;
