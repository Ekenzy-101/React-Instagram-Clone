import { Avatar, AppBar, Hidden, Toolbar, Button } from "@material-ui/core";
import React from "react";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FACEBOOK_LOGO_URL } from "../../../utils/constants/url";

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
        <Toolbar className={classes.toolbar}>
          <ReactFacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={onFacebookResponse}
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
                  src={FACEBOOK_LOGO_URL}
                  variant="square"
                  className={classes.facebookLogo}
                />
                Log in with Facebook
              </Button>
            )}
          />
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default SignupFooter;
