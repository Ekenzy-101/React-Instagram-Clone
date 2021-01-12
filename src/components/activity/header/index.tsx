import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";
import React from "react";

import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";

const ActivityHeader: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <Typography></Typography>
          <Typography variant="h6" color="textPrimary">
            Activity
          </Typography>
          <Typography></Typography>
        </Hidden>
        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default ActivityHeader;
