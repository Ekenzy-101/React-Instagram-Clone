import { AppBar, Avatar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useMedia } from "react-use";

import { IG_MONOCHROME_LOGO_URL } from "../../utils/constants/url";
import { useStyles } from "./styles";

const PasswordResetHeader: React.FC = () => {
  // Other hooks
  const classes = useStyles();
  const mobileView = useMedia(`(max-width: 600px)`);

  // JSX
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        {mobileView ? (
          <Typography variant="h6" style={{ color: "#262626", margin: "auto" }}>
            Change Password
          </Typography>
        ) : (
          <Avatar
            src={IG_MONOCHROME_LOGO_URL}
            variant="square"
            className={classes.brandLogo}
          />
        )}
        <p></p>
        <p></p>
      </Toolbar>
    </AppBar>
  );
};

export default PasswordResetHeader;
