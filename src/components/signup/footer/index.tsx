import { AppBar, Hidden, Button } from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import React from "react";

import FacebookButton from "../../../common/facebook/button";
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
              <Facebook className={classes.facebookLogo} />
              Log in with Facebook
            </Button>
          )}
        />
      </AppBar>
    </Hidden>
  );
};

export default SignupFooter;
