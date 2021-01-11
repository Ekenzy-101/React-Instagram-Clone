import React from "react";
import { useStyles } from "./styles";
import "./styles.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const LoadingProgressBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar position="sticky" className={classes.appbar}>
        <span id="loading-animation" className="loading-progress-bar"></span>
        <Toolbar className={classes.toolbar}>
          <Typography color="textPrimary" variant="h6">
            Sharing...
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LoadingProgressBar;
