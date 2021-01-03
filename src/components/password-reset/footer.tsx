import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import { TO_LOGIN_PAGE } from "../../utils/constants/routes";
import { useStyles } from "./styles";

const PasswordResetFooter: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" variant="outlined" className={classes.footer}>
      <Toolbar className={classes.toolbar}>
        <Link to={TO_LOGIN_PAGE} className={classes.link}>
          Back to Login
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PasswordResetFooter;
