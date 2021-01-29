import { useApolloClient } from "@apollo/client";
import { Hidden, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTitle } from "react-use";

import useForm from "../../common/hooks/useForm";
import LoadingPage from "../../common/loading/page";
import LoginFooter from "../../components/login/footer";
import LoginHeader from "../../components/login/header";
import LoginWrapper from "../../components/login/wrapper";
import {
  TO_HOME_PAGE,
  TO_PASSWORDRESET_PAGE,
} from "../../utils/constants/routes";
import {
  validateEmail,
  validatePassword,
} from "../../utils/helpers/validation";
import { GET_AUTH_USER } from "../../utils/queries/user";
import { login, loginWithFacebook } from "../../utils/services/authService";
import { debug } from "../../utils/services/debugService";
import { useStyles } from "./styles";

const LoginPage: React.FC = () => {
  // State Hooks
  const [pageLoading, setPageLoading] = useState(false);

  // Other Hooks
  const classes = useStyles();
  const client = useApolloClient();
  const history = useHistory();
  const { state } = useLocation();
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
  useTitle("Login - Instagram");

  // Event Handlers
  const handleFacebookResponse = async (response: any) => {
    setPageLoading(true);
    debug.log(response);

    const email = response.email as string;
    const name = response.name as string;
    const image_url = response.picture.data.url as string;

    try {
      const { data } = await loginWithFacebook({ email, name, image_url });

      debug.log(data);

      const authUser = { __typename: "User", ...data };
      client.writeQuery({ query: GET_AUTH_USER, data: { profile: authUser } });

      state ? history.push(state as string) : history.push(TO_HOME_PAGE);
    } catch (error) {
      debug.log(error?.response?.status, error?.response?.data);

      setPageLoading(false);
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage("An unexpected error occured. Please try again");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitted");
    const { email, password } = formData;

    try {
      const { data } = await login({ email, password });

      debug.log(data);

      const authUser = { __typename: "User", ...data };
      client.writeQuery({ query: GET_AUTH_USER, data: { profile: authUser } });
      state ? history.push(state as string) : history.push(TO_HOME_PAGE);
    } catch (error) {
      setFormState("initial");

      debug.log(error?.response?.status, error?.response?.data);

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage("An unexpected error occured. Please try again");
      }
    }
  };

  // JSX
  if (pageLoading) return <LoadingPage />;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <LoginHeader />
      <LoginWrapper
        renderErrorMessage={renderErrorMessage}
        onFacebookResponse={handleFacebookResponse}
      >
        <form onSubmit={handleSubmit}>
          {renderInput({
            label: "Email",
            name: "email",
            validate: validateEmail,
          })}
          {renderInput({
            label: "Password",
            name: "password",
            validate: validatePassword,
            type: "password",
          })}
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
