import { Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import PasswordChangeHeader from "../../components/password-change/header";
import PasswordChangeBody from "../../components/password-change/body";
import Footer from "../../common/footer";
import { useTitle } from "react-use";

const PasswordChangePage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();

  useTitle("Change Password - Kenzygram");

  return (
    <Paper className={classes.root} square variant="outlined">
      <PasswordChangeHeader />
      <div className={classes.wrapper}>
        <PasswordChangeBody />
      </div>
      <Footer />
    </Paper>
  );
};

export default PasswordChangePage;
