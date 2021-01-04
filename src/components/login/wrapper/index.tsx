import { Avatar, Typography, Button, Hidden } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import {
  TO_PASSWORDRESET_PAGE,
  TO_SIGNUP_PAGE,
} from "../../../utils/constants/routes";
import {
  IG_MONOCHROME_LOGO1_URL,
  FACEBOOK_LITE_LOGO_URL,
  FACEBOOK_DARK_LOGO_URL,
} from "../../../utils/constants/url";
import FacebookButton from "../../../common/facebook/button";

interface Props {
  onFacebookResponse: (response: any) => void;
  renderErrorMessage: () => "" | JSX.Element;
}

const LoginWrapper: React.FC<Props> = ({
  onFacebookResponse,
  renderErrorMessage,
  children,
}) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.wrapper}>
        <Avatar
          src={IG_MONOCHROME_LOGO1_URL}
          className={classes.brandLogo}
          variant="square"
        />

        <Hidden smUp>
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
                <Avatar
                  src={FACEBOOK_LITE_LOGO_URL}
                  variant="square"
                  className={classes.facebookLogo}
                />
                Continue with Facebook
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

        <Hidden smUp>
          <br />
          {renderErrorMessage()}
        </Hidden>
        <Hidden xsDown>
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
                variant="text"
                color="primary"
                className={classes.facebookLoginBtn}
                disableElevation
                fullWidth
                onClick={renderProps.onClick}
              >
                <Avatar
                  src={FACEBOOK_DARK_LOGO_URL}
                  variant="square"
                  className={classes.facebookLogo}
                />
                Log in with Facebook
              </Button>
            )}
          />
          {renderErrorMessage()}
          <Typography className={classes.linkWrapper}>
            <Link to={TO_PASSWORDRESET_PAGE} className={classes.darkLink}>
              Forgot Password?
            </Link>
          </Typography>
        </Hidden>
      </div>

      <div className={clsx(classes.wrapper, classes.smallWrapper)}>
        <Typography className={classes.linkWrapper}>
          Don't Have an account?{" "}
          <Link to={TO_SIGNUP_PAGE} className={classes.link}>
            Signup
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginWrapper;
