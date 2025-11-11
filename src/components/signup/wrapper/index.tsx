import { Avatar, Typography, Button, Hidden } from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";
import { TO_LOGIN_PAGE } from "../../../utils/constants/routes";
import { IG_MONOCHROME_LOGO_URL } from "../../../utils/constants/url";
import FacebookButton from "../../../common/facebook/button";

interface Props {
  onFacebookResponse: (response: any) => void;
}

const SignupWrapper: React.FC<Props> = ({ onFacebookResponse, children }) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <div>
      <div className={classes.wrapper}>
        <Avatar
          src={IG_MONOCHROME_LOGO_URL}
          className={classes.brandLogo}
          variant="square"
        />
        <Typography variant="body1" className={classes.legend}>
          Sign up to see photos and videos from your friends.
        </Typography>
        <Hidden xsDown>
          <FacebookButton
            onFacebookResponse={onFacebookResponse}
            render={(renderProps: {
              onClick:
                | ((
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => void)
                | undefined;
            }) => (
              <Button
                variant="contained"
                color="primary"
                className={classes.facebookLoginBtn}
                disableElevation
                fullWidth
                onClick={renderProps.onClick}
              >
                <Facebook className={classes.facebookLogo} />
                Log in with Facebook
              </Button>
            )}
          />

          <div className={classes.dividerGroup}>
            <div className={classes.divider}></div>
            <Typography
              variant="body1"
              style={{ marginBottom: 0 }}
              className={classes.legend}
            >
              OR
            </Typography>
            <div className={classes.divider}></div>
          </div>
        </Hidden>
        {children}
      </div>
      <div className={clsx(classes.smallWrapper, classes.wrapper)}>
        <Typography className={classes.linkWrapper}>
          Have an account?{" "}
          <Link to={TO_LOGIN_PAGE} className={classes.link}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignupWrapper;
