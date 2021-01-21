import { Paper, useMediaQuery } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import PasswordChangeHeader from "../../components/password-change/header";
import PasswordChangeBodyMobileView from "../../components/password-change/body/mobile-view";
import PasswordChangeBodyDesktopView from "../../components/password-change/body/desktop-view";
import Footer from "../../common/footer";
import { useTitle } from "react-use";

const PasswordChangePage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const tabView = useMediaQuery(`(max-width: 735px)`);

  useTitle("Change Password - Instagram");

  return (
    <Paper className={classes.root} square variant="outlined">
      <PasswordChangeHeader />
      <div className={classes.wrapper}>
        {tabView ? (
          <PasswordChangeBodyMobileView />
        ) : (
          <PasswordChangeBodyDesktopView />
        )}
      </div>
      <Footer />
    </Paper>
  );
};

export default PasswordChangePage;
