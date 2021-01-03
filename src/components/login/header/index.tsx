import { AppBar, Hidden, Toolbar, Typography } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";

const LoginHeader: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();

  // JSX
  return (
    <Hidden smUp>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <ArrowBackIos
              className={classes.backIcon}
              onClick={() => history.goBack()}
            />
            <Typography color="textPrimary">
              <strong>Login</strong>
            </Typography>
            <Typography></Typography>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default LoginHeader;
