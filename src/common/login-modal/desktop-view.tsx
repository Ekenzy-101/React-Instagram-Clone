import { Avatar, Button, Dialog, Divider, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import FacebookButton from "../facebook/button";
import {
  TO_PASSWORDRESET_PAGE,
  TO_SIGNUP_PAGE,
} from "../../utils/constants/routes";
import {
  IG_MONOCHROME_LOGO1_URL,
  FACEBOOK_DARK_LOGO_URL,
} from "../../utils/constants/url";

interface Props {
  onFacebookResponse: (response: any) => void;
  renderErrorMessage: () => "" | JSX.Element;
  open: boolean;
  onClose: () => void;
}

const DesktopViewLoginModal: React.FC<Props> = (props) => {
  const {
    onFacebookResponse,
    renderErrorMessage,
    children,
    open,
    onClose,
  } = props;
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={classes.root}>
        <Close onClick={onClose} className={classes.closeButton} />
        <div className={classes.wrapper}>
          <Avatar
            src={IG_MONOCHROME_LOGO1_URL}
            className={classes.brandLogo}
            variant="square"
          />

          {children}

          <br />
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
        </div>
        <Divider />
        <div className={clsx(classes.wrapper, classes.smallWrapper)}>
          <Typography className={classes.linkWrapper}>
            Don't Have an account?{" "}
            <Link to={TO_SIGNUP_PAGE} className={classes.link}>
              Sign up
            </Link>
          </Typography>
        </div>
        <Divider />
        <br />
      </div>
    </Dialog>
  );
};

export default DesktopViewLoginModal;
