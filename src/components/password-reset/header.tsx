import { AppBar, Avatar, Toolbar } from "@material-ui/core";
import React from "react";

import { IG_MONOCHROME_LOGO_URL } from "../../utils/constants/url";
import { useStyles } from "./styles";

const PasswordResetHeader: React.FC = () => {
  // Other hooks
  const classes = useStyles();

  // JSX
  return (
    <AppBar position="sticky" variant="outlined" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Avatar
          src={IG_MONOCHROME_LOGO_URL}
          variant="square"
          className={classes.brandLogo}
        />
      </Toolbar>
    </AppBar>
  );
};

export default PasswordResetHeader;
