import { Hidden, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";

import useForm from "../../common/hooks/useForm";
import usePageTitle from "../../common/hooks/usePageTitle";
import LoginFooter from "../../components/login/footer";
import LoginHeader from "../../components/login/header";
import LoginWrapper from "../../components/login/wrapper";
import {
  TO_HOME_PAGE,
  TO_PASSWORDRESET_PAGE,
} from "../../utils/constants/routes";
import { useUserContext } from "../../utils/context/user";
import {
  validateEmail,
  validatePassword,
} from "../../utils/helpers/validation";
import { login } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { User } from "../../utils/types/user";
import { useStyles } from "./styles";

const LoginPage: React.FC = () => {
  // Global State Hooks
  const { setUser } = useUserContext()!;
  // Other Hooks
  const classes = useStyles();
  const history = useHistory();
  const {
    renderInput,
    renderButton,
    renderErrorMessage,
    setErrorMessage,
    setFormState,
    formData,
  } = useForm({
    email: "",
    password: "",
  });

  // Effect Hooks
  usePageTitle("Login - Instagram");

  // Event Handlers
  const handleFacebookResponse = (response: any) => {
    console.log(response);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitted");
    const { email, password } = formData;

    try {
      const { data } = await login({ email, password });

      debug.log(data);

      setUser(data as User);
      history.push(TO_HOME_PAGE);
    } catch (error) {
      setFormState("initial");

      debug.log(error?.response?.status, error?.response?.data);

      if (error?.response?.status === 400 && error?.response?.status < 500) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage("An unexpected error occured. Please try again");
      }
    }
  };

  // JSX
  return (
    <Paper variant="outlined" square className={classes.root}>
      <LoginHeader />
      <LoginWrapper
        renderErrorMessage={renderErrorMessage}
        onFacebookResponse={handleFacebookResponse}
      >
        <form onSubmit={handleSubmit}>
          {renderInput("Email", "email", validateEmail)}
          {renderInput(
            "Password",
            "password",
            validatePassword,
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
