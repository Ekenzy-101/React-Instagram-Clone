import { Typography, Button, Hidden } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import { TO_LOGIN_PAGE, TO_SIGNUP_PAGE } from "../../../utils/constants/routes";
import { MailOutline } from "@material-ui/icons";

interface Props {
  email: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const VerifyEmailWrapper: React.FC<Props> = ({ children, email, onClick }) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <div>
      <div className={classes.wrapper}>
        <Hidden>
          <MailOutline className={classes.mailLogo} />
        </Hidden>
        <Typography variant="body1" className={classes.legend}>
          Enter Confirmation Code
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.secondaryText}
        >
          Enter the confirmation code we sent to {email}.{" "}
          <Button
            variant="text"
            className={classes.resendBtn}
            color="primary"
            disableElevation
            disableFocusRipple
            onClick={onClick}
          >
            Resend Code
          </Button>
        </Typography>
        {children}
        <Hidden xsDown>
          <br />
          <Typography className={classes.linkWrapper}>
            <Link
              to={TO_SIGNUP_PAGE}
              style={{ fontWeight: 600 }}
              className={classes.link}
            >
              Go back
            </Link>
          </Typography>
        </Hidden>
      </div>
      <Hidden xsDown>
        <div className={clsx(classes.smallWrapper, classes.wrapper)}>
          <Typography className={classes.linkWrapper}>
            Have an account?{" "}
            <Link to={TO_LOGIN_PAGE} className={classes.link}>
              Login
            </Link>
          </Typography>
        </div>
      </Hidden>
    </div>
  );
};

export default VerifyEmailWrapper;
