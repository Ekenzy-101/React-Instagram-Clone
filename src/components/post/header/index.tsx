import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";
import DesktopViewHeader from "../../../common/header";
import MobileViewHeader from "../../../common/header/mobile-view";
import { useUserContext } from "../../../utils/context/user";

const PostHeader: React.FC = () => {
  // Global State Hooks
  const { user } = useUserContext()!;

  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // JSX
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <Hidden smUp>
            <ArrowBackIos
              className={classes.backIcon}
              onClick={() => history.goBack()}
            />
            <Typography color="textPrimary">
              <strong>Photo</strong>
            </Typography>
            <Typography></Typography>
          </Hidden>
        ) : (
          <MobileViewHeader />
        )}

        <DesktopViewHeader />
      </Toolbar>
    </AppBar>
  );
};

export default PostHeader;
