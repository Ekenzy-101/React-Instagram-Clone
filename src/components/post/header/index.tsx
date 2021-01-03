import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";

import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";

const PostHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <ArrowBackIos className={classes.backIcon} />
          <Typography color="textPrimary">
            <strong>Photo</strong>
          </Typography>
          <Typography></Typography>
        </Hidden>

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default PostHeader;
