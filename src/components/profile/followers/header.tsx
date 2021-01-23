import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

import { useStyles } from "../header/styles";

const ProfileFollowersHeader: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <ArrowBackIos
          className={classes.icon}
          onClick={() => history.goBack()}
        />
        <Typography color="textPrimary" variant="h6">
          Followers
        </Typography>
        <p></p>
      </Toolbar>
    </AppBar>
  );
};

export default ProfileFollowersHeader;
