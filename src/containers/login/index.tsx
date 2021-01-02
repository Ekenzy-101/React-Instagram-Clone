import { Hidden, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import useForm from "../../common/hooks/useForm";
import usePageTitle from "../../common/hooks/usePageTitle";
import LoginFooter from "../../components/login/footer";
import LoginHeader from "../../components/login/header";
import LoginWrapper from "../../components/login/wrapper";
import { TO_PASSWORDRESET_PAGE } from "../../utils/constants/routes";
import { useStyles } from "./styles";

const LoginPage: React.FC = () => {
  // Other Hooks
  const classes = useStyles();
  const { renderInput, renderButton } = useForm({});

  // Effect Hooks
  usePageTitle("Login - Instagram");

  // Event Handlers
  const handleFacebookResponse = (response: any) => {
    console.log(response);
  };

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <LoginHeader />
      <LoginWrapper onFacebookResponse={handleFacebookResponse}>
        <form>
          {renderInput("Email", "email")}
          {renderInput(
            "Password",
            "password",
            undefined,
            undefined,
            "password"
          )}
          <Hidden smUp>
            <Typography className={classes.linkWrapper}>
              <Link to={TO_PASSWORDRESET_PAGE} className={classes.link}>
                Forgot Password?
              </Link>
            </Typography>
          </Hidden>
          {renderButton("Log in")}
        </form>
      </LoginWrapper>
      <LoginFooter />
    </Paper>
  );
};

export default LoginPage;
