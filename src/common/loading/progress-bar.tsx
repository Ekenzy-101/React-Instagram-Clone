import React from "react";
import { useStyles } from "./styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
interface Props {
  title?: string;
}

const LoadingProgressBar: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar position="sticky" className={classes.appbar}>
        <span id="loading-animation" className="loading-progress-bar"></span>
        <Toolbar className={classes.toolbar}>
          <Typography color="textPrimary" variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

LoadingProgressBar.defaultProps = {
  title: "Sharing...",
};

export default LoadingProgressBar;
