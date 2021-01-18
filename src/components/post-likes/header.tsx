import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Close } from "@material-ui/icons";

import { useStyles } from "./styles";

const PostLikesHeader: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // JSX
  return (
    <>
      <AppBar position="sticky" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Close
            className={classes.backIcon}
            onClick={() => history.goBack()}
          />{" "}
          <Typography variant="h6" color="textPrimary">
            Likes
          </Typography>
          <p></p>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PostLikesHeader;
