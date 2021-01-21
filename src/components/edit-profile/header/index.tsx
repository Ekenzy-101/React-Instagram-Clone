import { AppBar, Hidden, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";

import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";

const EditProfileHeader: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // JSX
  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <ArrowBackIos
              className={classes.backIcon}
              onClick={() => history.goBack()}
            />{" "}
            <Typography variant="h6" color="textPrimary">
              Edit Profile
            </Typography>
            <p></p>
          </Hidden>
          <DesktopViewHeader />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default EditProfileHeader;
