import { AppBar, Toolbar, Hidden } from "@material-ui/core";
import React from "react";

import CustomSearch from "../../../common/search";
import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";

const ExploreHeader = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <CustomSearch fullWidth={true} borderRadius="0.4rem" />
        </Hidden>

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default ExploreHeader;
