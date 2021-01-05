import { Avatar, AppBar, Hidden, Button } from "@material-ui/core";
import React from "react";

import FacebookButton from "../../../common/facebook/button";
import { FACEBOOK_LITE_LOGO_URL } from "../../../utils/constants/url";
import { useStyles } from "./styles";
interface Props {
  onFacebookResponse: (response: any) => void;
}

const SignupFooter: React.FC<Props> = ({ onFacebookResponse }) => {
  // Other Hooks
  const classes = useStyles();

  // JSX
  return (
    <Hidden smUp>
      <AppBar position="sticky" className={classes.root}>
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
              Log in with Facebook
            </Button>
          )}
        />
      </AppBar>
    </Hidden>
  );
};

export default SignupFooter;
