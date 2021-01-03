import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { PersonAddOutlined, PhotoCameraOutlined } from "@material-ui/icons";
import DesktopViewHeader from "../../../common/header";

const ProfileHeader = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <PhotoCameraOutlined className={classes.icon} />
          <Typography color="textPrimary" variant="h6">
            kenzy_d_coder
          </Typography>
          <PersonAddOutlined className={classes.icon} />
        </Hidden>

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default ProfileHeader;
